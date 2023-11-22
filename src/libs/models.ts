import { IParishioner } from "@/types";
import mongoose, { Schema, model } from "mongoose";

const parishionerSchema = new Schema<IParishioner>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  occupation: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  phoneNumber: String,
  gender: String,
  email: String,
  baptized: Boolean,
  confirmed: Boolean,
  communicant: Boolean
}, {
  timestamps: true,
})

const Parishioner = mongoose.models.Parishioner || model<IParishioner>('Parishioner', parishionerSchema)

export default Parishioner