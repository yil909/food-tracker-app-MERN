import mongoose from "mongoose";
// TransactionLog:
// _id: Unique identifier for each waste log entry (MongoDB's ObjectID)
// restaurantId: Identifier of the restaurant or cafe associated with the food item (references _id in Users collection)
// foodItemId: Identifier of the food item associated with the waste log entry (references _id in FoodItems collection)
// quantity: Quantity of the food item (in kg)
// unit: Unit of measurement (kg)
// pricePerUnit: Price per unit of the food item (e.g., $10/kg)
// timeStamp: transaction date & time
// action:  (e.g. ADD, USE, WASTE, WIP)
// newExpiryDate:  new expiry date after the food-items changed status to WIP

const transactionLogSchema = new mongoose.Schema({
    
    _id: {
        type: String,
        required: true
    },
    restaurantId: {
        type: String,
        required: true
    },
    foodItemId: {
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
    pricePerUnit: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    action: {
        type: String,
        required: true
    },
    newExpiryDate: {
        type: Date,
        required: true
    },
   
});

export const TransactionLog = mongoose.model('TransactionLog', transactionLogSchema);
