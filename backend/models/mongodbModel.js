import mongoose from "mongoose";

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