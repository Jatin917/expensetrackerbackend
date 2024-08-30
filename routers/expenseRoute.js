import { Router } from "express";
import { authMiddleware } from "../middlewares/authentication.js";
import { expenseController } from "../controllers/expenseController.js";
import { getExpenseController } from "../controllers/getExpenseController.js";
import { updateController } from "../controllers/updateController.js";

export const expenseRoute = Router();


expenseRoute.post('/addexpense',authMiddleware, expenseController);
expenseRoute.get('/expenses',authMiddleware, getExpenseController);
expenseRoute.post('/updateitem',authMiddleware, updateController);