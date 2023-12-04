import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',  // Reference to the Restaurants collection
    required: true
  },
  foodCategoryID: {
    type: mongoose.Schema.Types.ObjectId,
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
    type: Number,
    required: true
  },
  expiryDate: {
    type: String,
    required: true
  },
  pricePerUnit: {
    type: Number,
    required: true
  }
});

export const FoodItem = mongoose.model('FoodItem', foodItemSchema);
