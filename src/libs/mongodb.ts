import { connect, Connection } from "mongoose";

let cachedConnection: Connection | null = null

export default async function connectToDb(){
  try {
    if (cachedConnection) {
      console.log('Using Cached Connection')
      return Promise.resolve(cachedConnection);
    }
    const connection = await connect(process.env.MONGODB_URI as string, { bufferCommands: false });
    console.log('Using new connection')
    cachedConnection = connection.connection
    return cachedConnection
  } catch (error) {
    throw error;
  }
}