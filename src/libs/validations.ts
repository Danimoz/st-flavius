import { z } from "zod";

/** Registration fee in kobo. The server re-checks this against Paystack. */
export const REGISTRATION_FEE_KOBO = 1000 * 100;

export const ContactFormSchema = z.object({
  name: z.string().min(3, { message: 'Name should have more than 3 characters' }),
  email: z.string().max(0).or(z.string().email()),
  phone: z.string().optional(),
  message: z.string().min(4, { message: 'Message should have more than 4 characters' })
}).refine((data) => !(!data.email && !data.phone), { 
  message: 'Input either email or phone', 
  path: ['email'] 
});

export type ContactFormErrors = Partial<Record<keyof z.infer<typeof ContactFormSchema>, string[] | undefined>>;


export const ParishionerRegistrationSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  dateOfBirth: z.string(),
  address: z.string().min(1).max(255),
  occupation: z.string(),
  email: z.string().max(0).or(z.string().email()),
  phone: z.string().optional(), // Update max length according to your needs
  baptized: z.string().transform(value => value === 'on').optional(),
  confirmed: z.string().transform(value => value === 'on').optional(),
  communicant: z.string().transform(value => value === 'on').optional(),
  married: z.string().transform(value => value === 'on').optional(),
}).refine((data) => !(!data.email && !data.phone), { 
  message: 'Input either email or phone', 
  path: ['email'] 
});

export type ParishionerRegistrationErrors = Partial<Record<keyof z.infer<typeof ParishionerRegistrationSchema>, string[] | undefined>>;

export const faultRoles = [
  'Parishioner',
  'Society / Group Executive',
  'Maintenance Committee Member',
  'Parish Staff / Security',
  'Visitor',
] as const;

export const faultLocations = [
  'Main Church Building (Nave / Sanctuary / Choir Gallery)',
  'Sacristy',
  'Father’s House / Presbytery',
  'Parish Office',
  'Church Perimeter',
  'Restrooms / Toilets',
  'Gen Room / Car Park / Solar',
  'Generator House / Solar Room',
  'Other',
] as const;

export const faultCategories = [
  'Electrical / Lighting (Bulbs, sockets, fans, DB boards)',
  'Sound & AV System (Microphones, speakers, mixers, screens)',
  'Solar / Inverter / Generator (Power supply issues)',
  'Air Conditioning / Fans',
  'Plumbing / Water Supply (Leaking pipes, boreholes, toilets, taps)',
  'Civil / Structural (Damaged pews, doors, windows, roof leak, tiles)',
  'Safety / Security (Fencing, gates, fire hazards, slippery areas)',
  'Other',
] as const;

export const faultSeverities = ['Low', 'Medium', 'High', 'Critical / Urgent'] as const;

export const safetyRisks = [
  'Naked electrical wire / Shock risk',
  'Water leakage near electrical equipment',
  'Broken glass / Sharp edges',
  'Slip hazard / Flooding',
  'None',
] as const;

export const FaultReportSchema = z.object({
  fullName: z.string().trim().min(2, 'Please enter your full name.').max(120),
  phone: z.string().trim().min(7, 'Please enter a valid phone number.').max(30),
  role: z.enum(faultRoles, { errorMap: () => ({ message: 'Please select your role or affiliation.' }) }),
  organisation: z.string().trim().max(120).optional(),
  observedAt: z.string().min(1, 'Please enter when the fault was observed.'),
  location: z.enum(faultLocations, { errorMap: () => ({ message: 'Please select the fault location.' }) }),
  category: z.enum(faultCategories, { errorMap: () => ({ message: 'Please select a fault category.' }) }),
  equipment: z.string().trim().max(160).optional(),
  briefSummary: z.string().trim().min(5, 'Please give a short summary.').max(160),
  description: z.string().trim().min(15, 'Please describe the fault in a little more detail.').max(4000),
  severity: z.enum(faultSeverities, { errorMap: () => ({ message: 'Please select an urgency level.' }) }),
  safetyRisks: z.array(z.enum(safetyRisks)).min(1, 'Please select any immediate safety risk, or choose None.'),
});

export type FaultReportData = z.infer<typeof FaultReportSchema>;
export type FaultReportErrors = Partial<Record<keyof FaultReportData | 'evidence' | 'form', string[]>>;
