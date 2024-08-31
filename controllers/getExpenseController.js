import { Expense } from "../model/schema.js";


const sortItmes = (allItems, name)=>{
    if(name=="") return allItems;
    allItems.sort((a,b)=>{
        if (a[name] < b[name]) return -1;
        if (a[name] > b[name]) return 1;
        return 0;
    });
    return allItems;

}

export const getExpenseController = async(req, res) =>{
    try {
        let cat = req.query.cat || "";
        let filter = req.query.filter || "";
        cat = cat==='null' ? "" : cat;
        filter = filter==='null' ? "" : filter;
        console.log(cat, filter);
        const userId = req.userId;
        const data = await Expense.find({ userId });
        let allItems = [];
        if(cat==="" || cat==="all"){
            data[0].expenses.forEach(cat=>{
                allItems.push(...cat.items);
            })
            allItems = sortItmes(allItems, filter);
            return res.status(200).json(allItems);
        }
        else{
            const catData = data[0].expenses.filter((expense) => {
                // console.log(expense.category);
                if(expense.category){
                    return expense.category.toLowerCase() === cat.toLowerCase();
                }
                return false;
            });
            
            if(catData.length===0) return res.status(200).json([]);
            console.log(catData[0].items);
            allItems = sortItmes(catData[0].items, filter);
            return res.status(200).json(catData[0].items);
        }
    } catch (error) {
        console.log("error in getting expenses ", error.message);
        return res.status(500).json({message:"Error in getting expenses"});
    }
}