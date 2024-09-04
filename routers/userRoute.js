import express from 'express'
import { signInController } from '../controllers/signInController.js';
import { signUpController } from '../controllers/signUpControllers.js';
import { authMiddleware } from '../middlewares/authentication.js';
import { verifyTokenController } from '../controllers/verifyTokenController.js';
const userRoute = express.Router();

userRoute.post('/signup', signUpController);
userRoute.post('/signin', signInController);
userRoute.get('/verify', authMiddleware, verifyTokenController)

export default userRoute;