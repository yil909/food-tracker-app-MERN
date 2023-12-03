import mongoose from "mongoose";
// FoodCategories:
// _id: Unique identifier for each food category (MongoDB's ObjectID)
// categoryName: Name of the food category (e.g., Meat, Dairy, Vegetables etc.)
// description: Brief description of the food category

const foodCategorySchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    categoryName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    
});

export const foodCategory = mongoose.model('Item', foodCategorySchema);
