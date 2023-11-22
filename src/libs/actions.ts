'use server'

import { IParishioner } from "@/types"
import Parishioner from "./models"
import connectToDb from "./mongodb"
import { ContactFormSchema, ParishionerRegistrationSchema } from "./validations"
import { revalidatePath } from "next/cache"

export async function handleContact(formData: FormData){
  const data = ContactFormSchema.safeParse(Object.fromEntries(formData))
 
  if (!data.success){
    return { error: data.error.flatten() }
  }
  console.log(data)
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
    await Parishioner.create(data.data)
    revalidatePath('/parishioners')
    return { success: true }
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