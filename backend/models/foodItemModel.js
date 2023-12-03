import mongoose from "mongoose";
// FoodItems:
// _id: Unique identifier for each food item (MongoDB's ObjectID)
// restaurantId: Identifier of the restaurant or cafe associated with the food item (references _id in Users collection)
// foodCategoryId: Identifier of the food category associated with the food item (references _id in FoodCategories collection)
// name: Name of the food item
// quantity: Quantity of the food item in stock (in kg)
// unit: Unit of measurement (kg)
// timestamp: order date time
// batchNumber: Unique identifier for the batch of the food item
// expiryDate: Date on which the food item expires
// pricePerUnit: Price per unit of the food item (e.g., $10/kg)

const foodItemSchema = new mongoose.Schema({
    
    _id: {
        type: String,
        required: true
    },
    restaurantId: {
        type: String,
        required: true
    },

    foodCategoryId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    batchNumber: {
        type: String,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    pricePerUnit: {
        type: String,
        required: true
    },
});

export const FoodItem = mongoose.model('Item', foodItemSchema);
