import { User } from "../Models/user.model"

export const getAllUser = async (req,res) =>{
    try {
        const currentUserId = req.auth.userId
        const users = await User.find({
            clerkId:{
                $ne:currentUserId
            }
        })

        res.status(200).json(users)
    } catch (error) {
        console.log("Error in getting all user" ,error);
        res.status(500).json({
            message:"Interval server error"
        })
    }
}