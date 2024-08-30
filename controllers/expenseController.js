import { Expense } from "../model/schema.js";

export const expenseController = async (req, res) => {
  try {
    const userBody = req.body;
    const userId = req.userId;
    const user = await Expense.findOne({ userId: userId });

    if (!user) {
      // Create a new expense document for the user
      const newExpense = new Expense({ userId: userId, expenses: [userBody] });
      await newExpense.save(); // Use save() instead of create()
      return res.status(200).json({ message: "Expense created successfully" });
    }

    // Check if the category already exists in the user's expenses
    const existingCategory = user.expenses.find((expense) => expense.category === userBody.category);

    if (!existingCategory) {
      // Add a new category to the user's expenses
      await Expense.updateOne({ userId: userId }, { $push: { expenses: userBody } });
      return res.status(200).json({ message: "Added to your expenses" });
    }

    // Update an existing category
    await Expense.updateOne(
      { userId: userId, "expenses.category": userBody.category },
      { $push: { "expenses.$.items": userBody.items } }
    );
    return res.status(200).json({ message: "Expense updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred while processing expense" });
  }
};