import { users } from "../model/schema.js";

export const verifyTokenController = async(req, res) => {
    try {
        const userId = req.userId;
        const user = await users.findById(userId);
        if(!user) res.status(401).json({message:"User does not exist"});
        return res.status(200).json({firstName: user.firstName});

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
}