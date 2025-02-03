import mongoose from "mongoose";

export const connectDb = async ()=>{
    try {
      const connection  = await mongoose.connect(process.env.MONOGDB_URI)
      console.log("connect:", connection);
      
    } catch (error) {
        console.log("Error: " ,error);
        process.exit(1)
    }
}