'use server';

import { FaultReportEmail } from '@/components/FaultReportEmail';
import { FaultReportSchema, type FaultReportErrors } from '@/libs/validations';
import { Resend } from 'resend';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_FILES = 3;
const ALLOWED_FILE_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',
  'video/mp4',
  'video/quicktime',
  'video/webm',
]);

export type FaultReportState = {
  status: 'idle' | 'error' | 'success';
  message: string;
  errors?: FaultReportErrors;
};

export const initialFaultReportState: FaultReportState = {
  status: 'idle',
  message: '',
};

function asString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === 'string' ? value : '';
}

function validateEvidence(files: File[]): string[] {
  const errors: string[] = [];

  if (files.length > MAX_FILES) errors.push('Attach no more than 3 files.');

  for (const file of files) {
    if (!ALLOWED_FILE_TYPES.has(file.type)) {
      errors.push(`${file.name} is not a supported photo or video format.`);
    }
    if (file.size > MAX_FILE_SIZE) {
      errors.push(`${file.name} is larger than 10 MB.`);
    }
  }

  return errors;
}

export async function submitFaultReport(
  _previousState: FaultReportState,
  formData: FormData,
): Promise<FaultReportState> {
  const website = asString(formData, 'website');
  if (website) {
    return { status: 'success', message: 'Thank you. Your report has been received.' };
  }

  const parsed = FaultReportSchema.safeParse({
    fullName: asString(formData, 'fullName'),
    phone: asString(formData, 'phone'),
    role: asString(formData, 'role'),
    organisation: asString(formData, 'organisation') || undefined,
    observedAt: asString(formData, 'observedAt'),
    location: asString(formData, 'location'),
    category: asString(formData, 'category'),
    equipment: asString(formData, 'equipment') || undefined,
    briefSummary: asString(formData, 'briefSummary'),
    description: asString(formData, 'description'),
    severity: asString(formData, 'severity'),
    safetyRisks: formData.getAll('safetyRisks').filter((value): value is string => typeof value === 'string'),
  });

  const evidence = formData
    .getAll('evidence')
    .filter((value): value is File => value instanceof File && value.size > 0);
  const evidenceErrors = validateEvidence(evidence);

  if (!parsed.success || evidenceErrors.length) {
    return {
      status: 'error',
      message: 'Please review the highlighted fields and try again.',
      errors: {
        ...(parsed.success ? {} : parsed.error.flatten().fieldErrors),
        ...(evidenceErrors.length ? { evidence: evidenceErrors } : {}),
      },
    };
  }

  if (parsed.data.safetyRisks.includes('None') && parsed.data.safetyRisks.length > 1) {
    return {
      status: 'error',
      message: 'Please review the safety risk selection.',
      errors: { safetyRisks: ['Choose None only when no other safety risk applies.'] },
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.EMAIL_USERNAME;
  if (!apiKey || !recipient) {
    console.error('Fault reporting email is not configured: RESEND_API_KEY or EMAIL_USERNAME is missing.');
    return {
      status: 'error',
      message: 'Email delivery is not configured yet. Please contact the parish office directly.',
    };
  }

  try {
    const attachments = await Promise.all(evidence.map(async (file) => ({
      filename: file.name,
      content: Buffer.from(await file.arrayBuffer()),
    })));

    const report = parsed.data;
    const text = [
      `Urgency: ${report.severity}`,
      `Summary: ${report.briefSummary}`,
      `Location: ${report.location}`,
      `Category: ${report.category}`,
      `Equipment: ${report.equipment || 'Not specified'}`,
      `Observed: ${report.observedAt}`,
      `Safety risk: ${report.safetyRisks.join(', ')}`,
      '',
      report.description,
      '',
      `Reported by: ${report.fullName}`,
      `Phone: ${report.phone}`,
      `Role: ${report.role}`,
      `Organisation: ${report.organisation || 'Not specified'}`,
      `Evidence: ${evidence.length ? evidence.map((file) => file.name).join(', ') : 'None'}`,
    ].join('\n');

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'St. Flavius Catholic Church <onboarding@resend.dev>',
      to: [recipient],
      subject: `[${report.severity.toUpperCase()}] Fault report: ${report.briefSummary.slice(0, 80)}`,
      text,
      react: FaultReportEmail({ ...report, attachmentNames: evidence.map((file) => file.name) }),
      attachments,
    });

    if (error) {
      console.error('Resend rejected a fault report email:', error);
      return { status: 'error', message: 'We could not deliver the report. Please try again or contact the parish office.' };
    }

    return {
      status: 'success',
      message: 'Your report has been delivered to the parish maintenance team. Thank you for helping us care for the church.',
    };
  } catch (error) {
    console.error('Fault report delivery failed:', error);
    return { status: 'error', message: 'We could not deliver the report. Please try again or contact the parish office.' };
  }
}
