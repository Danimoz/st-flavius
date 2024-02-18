'use server'

import { IParishioner } from "@/types"
import Parishioner from "./models"
import connectToDb from "./mongodb"
import { ContactFormSchema, ParishionerRegistrationSchema } from "./validations"
import { revalidatePath } from "next/cache"
import { Resend } from "resend"
import { EmailTemplate } from "@/components/emailTemplate"

export async function handleContact(formData: FormData){
  const validata = ContactFormSchema.safeParse(Object.fromEntries(formData))
 
  if (!validata.success){
    return { error: validata.error.flatten() }
  }

  const resend = new Resend(process.env.RESEND_API_KEY as string)
  const emailUser = process.env.EMAIL_USERNAME as string;

  let { name, email, message, phone } = validata.data
  if (!phone) phone = ''

  try {
    const { data } = await resend.emails.send({
      from: 'St Flavius Catholic Church <onboarding@resend.dev>',
      to: [emailUser],
      subject: 'New Message from Auto Clems',
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
      react: EmailTemplate({ name, email, phone, message })
    });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
  
}

async function generateSequentialId() {
  const count = await Parishioner.countDocuments();
  return String(count + 1).padStart(4, '0');
}

export async function newParishioner(formData: FormData){
  const data = ParishionerRegistrationSchema.safeParse(Object.fromEntries(formData))
  if (!data.success) return { error: data.error.flatten() }

  try {
    await connectToDb();
    const existingUser = await Parishioner.findOne({
      firstName: data.data.firstName,
      lastName: data.data.lastName
    })
    if (existingUser) return {error: 'Parishioner already exist'}
    const id = await generateSequentialId()
    const parishioner = await Parishioner.create({ parishionerId: id, ...data.data })

    revalidatePath('/parishioners')
    return { success: true , parishionerId: parishioner._id }
  } catch(error) {
    return {error: 'Could not register at this time'}
  }
}

export async function allParishioners(page: number, limit: number, query?: string){
  try {
    await connectToDb();

    let parishionersQuery = Parishioner.find()

    if (query) {
      parishionersQuery = parishionersQuery.or([
        { firstName: { $regex: new RegExp(query, 'i') }},
        { lastName: { $regex: new RegExp(query, 'i') }},
        { occupation: { $regex: new RegExp(query, 'i') }},
      ]);
    }

    const totalParishionersCount = await Parishioner.countDocuments(parishionersQuery.getQuery());
    const skip = (page - 1) * limit
    const parishioners: IParishioner[] = await parishionersQuery.skip(skip).limit(limit).exec();
    
    return { success: true, data: parishioners, error: null, totalItems: totalParishionersCount }
  } catch(error: any) {
    return { success: false, data: null, totalItems: 0, error: 'Error retrieving parishioners: ' + (error.message || 'Unknown Error') }
  }
}