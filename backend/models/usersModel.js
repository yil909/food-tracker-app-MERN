import mongoose from "mongoose";
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

export const User = mongoose.model('User', userSchema);
