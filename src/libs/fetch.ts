import Parishioner from "./models";
import connectToDb from "./mongodb";

export async function getParishioner(id: string){
  try {
    await connectToDb();
    const parishioner = await Parishioner.findById(id)
    if (!parishioner) return { success: false }
    return { success: true, parishioner }
  } catch(error){
    return { success: false }
  }
}

export async function numberOfParishioners(){
  try {
    await connectToDb();
    const parishioners = await Parishioner.find({})
    return { success: true, total: parishioners.length }
  } catch(error){
    return { success: false }
  }
}