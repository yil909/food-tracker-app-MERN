import mongoose from "mongoose";
// inventory model
const inventorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    item: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    expDate: {
        type: Date,
        required: true
    }
});

export const Inventory = mongoose.model('Item', inventorySchema);


// Users:
// _id: Unique identifier for each user (MongoDB's ObjectID)
// username: Username for login authentication
// password: Hashed password for secure user authentication
// restaurantName: Name of the restaurant or cafe associated with the user
// address: Address of the restaurant
// location: Location of the restaurant
// contact: Contact information for the restaurant


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
