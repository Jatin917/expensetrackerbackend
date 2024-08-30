import { Expense } from "../model/schema.js";


export const getExpenseController = async(req, res) =>{
    try {
        const cat = req.query.cat || "";
        const userId = req.userId;
        const data = await Expense.find({ userId });
        if(cat==="")
        return res.status(200).json(data[0].expenses);
        else{
            const catData = data[0].expenses.filter((expense) => expense.category.toLowerCase() === cat.toLowerCase());
            return res.status(200).json(catData);
        }
    } catch (error) {
        console.log("error in getting expenses")
        return res.status(500).json({message:"Error in getting expenses"});
    }
}