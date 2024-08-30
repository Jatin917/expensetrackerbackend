import { Router } from "express";
import { authMiddleware } from "../middlewares/authentication.js";
import { expenseController } from "../controllers/expenseController.js";
import { getExpenseController } from "../controllers/getExpenseController.js";
import { updateController } from "../controllers/updateController.js";
import { totalExpense } from "../controllers/totalExpense.js";
import { sortingController } from "../controllers/sortingController.js";
import { searchController } from "../controllers/searchController.js";

export const expenseRoute = Router();


expenseRoute.post('/addexpense',authMiddleware, expenseController);
expenseRoute.get('/expenses',authMiddleware, getExpenseController);
expenseRoute.post('/updateitem',authMiddleware, updateController);
expenseRoute.get('/totalexpense',authMiddleware, totalExpense);
expenseRoute.get('/filter',authMiddleware, sortingController);
expenseRoute.get('/search',authMiddleware, searchController);