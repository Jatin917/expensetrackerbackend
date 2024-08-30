import { z } from 'zod';
import { users } from '../model/schema.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const validateUser = (firstName, lastName, email, password) =>{
    try {
        // validation
        const userSchema = z.object({
            firstName:z.string().min(2, {message:"Must be 2 characters long"}).max(20, {message:"Must not be 20 characters long"}),
            lastName:z.string().min(2, {message:"Must be 2 characters long"}).max(20, {message:"Must not be 20 characters long"}),
            email:z.string().email(),
            password:z.string()
            .min(8, {message:"Must be 8 characters long"})
            .max(20, {message:"Must not be 20 characters long"})
            .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
            .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
            .regex(/[0-9]/, { message: "Password must contain at least one number" })
            .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" })
        });
        return userSchema.safeParse({firstName, lastName, email, password});
    } catch (error) {
        console.log(error.message);
    }
}

export const signUpController = async (req, res) => {
    try {
        const userBody = req.body;
        const {firstName, lastName, email, password} = userBody;
        const result = validateUser(firstName, lastName, email, password);
        if(!result.success){
            return res.status(411).json(result.error.issues[0].message);
        }
        const user = await users.findOne({
            email:userBody.email
        });
        if(user._id){
            return res.status(411).json({
                messsage:"Email already taken / Incorrect inputs"
            })
        };
        const dbUser = await users.create(userBody);
        const token = jwt.sign({
            userId:dbUser._id
        }, JWT_SECRET);

        // const user = new users({firstName, lastName, email, password});
        // const response = await user.save();
        return res.json({
            message:"user created successfully",
            token:token
        });
    } catch (error) {
        console.log(error.message);
    }
}