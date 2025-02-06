import mongoose from "mongoose";

export const connectDb = async ()=>{
    try {
      const connection  = await mongoose.connect(process.env.MONGODB_URI)
      console.log(`✅ MongoDB Connected: ${connection.connection.host}`);
      
    } catch (error) {
        console.log("Error: " ,error);
        process.exit(1)
    }
}