import {User} from "../Models/user.model.js"
export const auth = async(req,res)=>{
    try {
        const {id,firstName,lastName,imageUrl} = req.body
        // check user exists
        const user = await User.findOne({
            clerkId:id
        })

        if(!user){
            // signup
            await User.create({
                clerkId:id,
                firstName: `${firstName} ${lastName}`,
                imageUrl
            });
        }

        res.status(200).json({
            message:"User created"
        })
    } catch (error) {
        console.log("Error in callback", error);
        res.status(500).json({
            message:"Interval server error"
        })
    }
}