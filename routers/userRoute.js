import express from 'express'
import { signInController } from '../controllers/signInController.js';
import { signUpController } from '../controllers/signUpControllers.js';
const userRoute = express.Router();

userRoute.post('/signup', signUpController);
userRoute.post('/signin', signInController);

export default userRoute;