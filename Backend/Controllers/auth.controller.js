import {User} from "../Models/user.model.js"
export const auth = async(req,res)=>{
    try {
        
        console.log("Incoming request body:", req.body);
        const {id,firstName,lastName,imageUrl} = req.body

        if (!id) {
            return res.status(400).json({ message: "Missing Clerk user ID" });
        }

        // check user exists
        let user = await User.findOne({
            clerkId:id
        })

        if(!user){
            // signup
            await User.create({
                clerkId:id,
                fullName: `${firstName} ${lastName}`,
                imageUrl: imageUrl || ""
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