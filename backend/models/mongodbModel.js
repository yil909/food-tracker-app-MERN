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

const userSchema = new mongoose.Schema({
    
    _id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    restaurantName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    
});

export const User = mongoose.model('Item', userSchema);


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

export const TransactionLog = mongoose.model('Item', transactionLogSchema);
