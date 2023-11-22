import { z } from "zod";

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
  occupation: z.string().min(1).max(100),
  email: z.string().max(0).or(z.string().email()),
  phone: z.string().optional(), // Update max length according to your needs
  baptized: z.string().transform(value => value === 'on').optional(),
  confirmed: z.string().transform(value => value === 'on').optional(),
  communicant: z.string().transform(value => value === 'on').optional(),
}).refine((data) => !(!data.email && !data.phone), { 
  message: 'Input either email or phone', 
  path: ['email'] 
});

export type ParishionerRegistrationErrors = Partial<Record<keyof z.infer<typeof ParishionerRegistrationSchema>, string[] | undefined>>;
