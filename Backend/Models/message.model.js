import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    //clerk's id
    senderId:{
        type:String,
        required:true
    },
    //clerk's id
    receiverId:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
})

export const Message = mongoose.model("Message", messageSchema  )