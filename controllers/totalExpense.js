import { Expense } from "../model/schema.js";

export const totalExpense = async(req, res) =>{
    try {
        const userId = req.userId;
        let month = req.query.filter || "";
        if(month==""){
            const d = new Date();
            month = d.getMonth() + 1;
        }
        let totalAmt = 0;
        const data = await Expense.find({userId});
        data[0].expenses.forEach((cat)=>{
            cat.items.forEach(item=>{
                const date = new Date(item.date);
                const mon = date.getMonth() + 1;
                if(mon===month){
                    totalAmt += item.amount;
                }
            })
        })
        
        res.status(200).json({amount:totalAmt});
    } catch (error) {
        res.status(500).json({message:"Error in getting total expense"});   
    }
}