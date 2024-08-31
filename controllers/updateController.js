import { Expense } from "../model/schema.js";

export const updateController = async (req, res) => {
  try {
    const userId = req.userId;
    const item = req.body;
    if (!item) {
      return res.status(400).json({ message: "Invalid request body" });
    }

    // const newItem = {};
    // if (item.name) newItem["expenses.$.items.$.name"] = item.name;
    // if (item.amount) newItem["expenses.$.items.$.amount"] = item.amount;
    const cat = item.category;
    const itemId = item._id;

    const response = await Expense.updateOne(
        { userId: userId, "expenses.items._id": itemId },
        {
          $set: {
            "expenses.$.items.$[item].name": item.name,
            "expenses.$.items.$[item].amount": item.amount
          }
        },
        {
          arrayFilters: [
            {
              "item._id": itemId
            }
          ]
        }
      );

    return res.status(200).json({ message: response });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteController = async (req, res) => {
  try {
    const userId = req.userId;
    const itemId = req.query.id;
    
    if (!itemId) {
      return res.status(400).json({ message: "Invalid item ID" });
    }

    const response = await Expense.updateOne(
      { userId: userId, "expenses.items._id": itemId },
      {
        $pull: {
          "expenses.$[].items": { _id: itemId }
        }
      }
    );

    return res.status(200).json({ message: response });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};