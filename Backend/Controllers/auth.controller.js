import {User} from "../Models/user.model.js"

export const auth = async (req, res) => {
    try {
        // console.log("Incoming request body:", req.body);

        const { id, firstName, lastName, imageUrl } = req.body;

        if (!id) {
            // console.log("Missing Clerk user ID");
            return res.status(400).json({ message: "Missing Clerk user ID" });
        }

        let user = await User.findOne({ clerkId: id });

        if (!user) {
            // console.log("Creating new user in database...");
            user = await User.create({
                clerkId: id,
                fullName: `${firstName} ${lastName}`,
                imageUrl: imageUrl || "",
            });
        }

        // console.log("User saved:", user);
        res.status(200).json({ message: "User created" });
    } catch (error) {
        console.log("Error in callback:", error);
         return res.status(500).json({ message: "Internal server error" });
    }
};
