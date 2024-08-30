import { Expense } from "../model/schema.js";

export const searchController = async (req, res)=>{
    try {
        const userId = req.userId;
        const data = await Expense.find({userId});
        let name = req.query.q || "";
        let allItems = [];
        data[0].expenses.forEach(cat=>{
            allItems.push(...cat.items);
        });
        const filteredItems = allItems.filter((item)=>{
            let n = name.toLowerCase();
            return item.name.toLowerCase().includes(n);
        });

        res.status(200).json(filteredItems);
    } catch (error) {
        res.status(500).json({message:"Error in Searching items"});   
    }
}