import Parishioner from "./models";
import connectToDb from "./mongodb";

export default async function getParishioner(id: string){
  try {
    await connectToDb();
    const parishioner = await Parishioner.findById(id)
    if (!parishioner) return { success: false }
    return { success: true, parishioner }
  } catch(error){
    return { success: false }
  }
}