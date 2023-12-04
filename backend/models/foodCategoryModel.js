import mongoose from "mongoose";

const foodCategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

export const FoodCategory = mongoose.model('FoodCategory', foodCategorySchema);
