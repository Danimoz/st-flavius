'use server'

import { IParishioner } from "@/types"
import Parishioner from "./models"
import connectToDb from "./mongodb"
import { ContactFormSchema, ParishionerRegistrationSchema, REGISTRATION_FEE_KOBO } from "./validations"
import { revalidatePath } from "next/cache"
import { requireAdminSession } from "./admin-auth"
import { sendParishEmail } from "./email"

export async function handleContact(formData: FormData){
  const validata = ContactFormSchema.safeParse(Object.fromEntries(formData))
 
  if (!validata.success){
    return { error: validata.error.flatten() }
  }

  let { name, email, message, phone } = validata.data
  if (!phone) phone = ''

  try {
    await sendParishEmail({
      subject: 'New message from the St. Flavius website',
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
      replyTo: email || undefined,
    });
    return { success: true };
  } catch (error) {
    console.error('Contact form Gmail delivery failed:', error)
    return { success: false };
  }
  
}

async function generateSequentialId() {
  const count = await Parishioner.countDocuments();
  return String(count + 1).padStart(4, '0');
}

async function createParishioner(formData: FormData) {
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

    revalidatePath('/admin/parishioners')
    revalidatePath('/registrationhold')
    return { success: true , parishionerId: parishioner._id }
  } catch(error) {
    console.error(error)
    return {error: 'Could not register at this time'}
  }
}

async function isPaymentVerified(reference: string) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY
  if (!secretKey) {
    console.error('PAYSTACK_SECRET_KEY is not configured')
    return false
  }

  try {
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      { headers: { Authorization: `Bearer ${secretKey}` }, cache: 'no-store' },
    )
    if (!response.ok) return false

    const { data } = await response.json()
    return data?.status === 'success'
      && data?.currency === 'NGN'
      && data?.amount >= REGISTRATION_FEE_KOBO
  } catch (error) {
    console.error('Paystack verification failed:', error)
    return false
  }
}

export async function newParishioner(formData: FormData, paymentReference: string) {
  if (!paymentReference || !(await isPaymentVerified(paymentReference))) {
    return { error: 'We could not verify your payment. Please contact the parish office.' }
  }
  return createParishioner(formData)
}

export async function registerParishionerByAdmin(formData: FormData) {
  await requireAdminSession()
  return createParishioner(formData)
}

export async function allParishioners(page: number, limit: number, query?: string){
  await requireAdminSession()
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
