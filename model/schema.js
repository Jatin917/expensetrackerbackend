import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        // unique:true,
    },
    password:{
        type:String,
        required:true,
    }
});

const expenseSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    expenses: [{
        category: {
            type: String,
            required: true
        },
        items: [{
            date: {
                type: Date,
                default: Date.now
            },
            name: {
                type: String,
                required: true
            },
            amount: {
                type: Number,
                required: true
            }
        }]
    }]
})

export const Expense = mongoose.model("expensed", expenseSchema);
export const users = mongoose.model('usersexpensetracker', userSchema);
