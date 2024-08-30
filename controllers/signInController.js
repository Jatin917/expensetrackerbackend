import dotenv from 'dotenv'
import { users } from "../model/schema.js";
import jwt from 'jsonwebtoken'

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
export const signInController =async (req, res) =>{
    try {
        const userBody = req.body;
        const user = await users.findOne({email: userBody.email});
        if(!user){
            return res.status(411).json({message: "Error while logging in"});
        }
        if(user.password!==userBody.password){
            return res.status(411).json({
                message:"Wrong Password"
            })
        }
        const token = jwt.sign({
            userId:user._id
        }, JWT_SECRET);
        return res.status(200).json({
            token:token
        });
    } catch (error) {
        console.log(error.message);
    }
}