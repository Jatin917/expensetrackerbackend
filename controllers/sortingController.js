import { Expense } from "../model/schema.js";

export const sortingController = async(req, res)=>{
    try {
        const userId = req.userId;
        const data = await Expense.find({userId});
        let name = req.query.sort || "name";
        let allItems = [];
        data[0].expenses.forEach(cat=>{
            allItems.push(...cat.items);
        })
        allItems.sort((a,b)=>{
            if (a[name] < b[name]) return -1;
            if (a[name] > b[name]) return 1;
            return 0;
        })
        res.status(200).json(allItems);
    } catch (error) {
        res.status(500).json({message:"Error in sorting items"});   
    }
}