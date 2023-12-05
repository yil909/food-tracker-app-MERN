import { FoodCategory } from "../models/foodCategoryModel.js";

export async function getAllFoodCategory (){
    const foodCat = await FoodCategory.find({});
    return foodCat;
}


