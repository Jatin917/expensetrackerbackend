import express from 'express'
import userRoute from './userRoute.js'
import { expenseRoute } from './expenseRoute.js';
const route = express.Router();

route.use('/user', userRoute);
route.use('/expense', expenseRoute);

export default route;