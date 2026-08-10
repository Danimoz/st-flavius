'use server';

import { sendParishEmail } from '@/libs/email';
import { FaultReportSchema } from '@/libs/validations';
import type { FaultReportState } from './state';

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

  try {
    const attachments = await Promise.all(evidence.map(async (file) => ({
      filename: file.name,
      content: Buffer.from(await file.arrayBuffer()),
      contentType: file.type,
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

    await sendParishEmail({
      subject: `[${report.severity.toUpperCase()}] Fault report: ${report.briefSummary.slice(0, 80)}`,
      text,
      attachments,
    });

    return {
      status: 'success',
      message: 'Your report has been delivered to the parish maintenance team. Thank you for helping us care for the church.',
    };
  } catch (error) {
    console.error('Fault report delivery failed:', error);
    return { status: 'error', message: 'We could not deliver the report. Please try again or contact the parish office.' };
  }
}
