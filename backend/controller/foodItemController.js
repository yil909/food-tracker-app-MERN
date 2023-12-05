import { FoodItem } from '../models/FoodItem.js';

// Get all food items
export const getAllFoodItems = async (req, res) => {
    try {
        const foodItems = await FoodItem.find();
        res.status(200).json(foodItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific food item by ID
export const getFoodItemById = async (req, res) => {
    const { id } = req.params;

    try {
        const foodItem = await FoodItem.findById(id);

        if (!foodItem) {
            return res.status(404).json({ message: 'Food item not found' });
        }

        res.status(200).json(foodItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new food item
export const createFoodItem = async (req, res) => {
    const foodItemData = req.body;

    try {
        const newFoodItem = await FoodItem.create(foodItemData);
        res.status(201).json(newFoodItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a food item by ID
export const updateFoodItem = async (req, res) => {
    const { id } = req.params;
    const updatedFoodItemData = req.body;

    try {
        const updatedFoodItem = await FoodItem.findByIdAndUpdate(id, updatedFoodItemData, { new: true });

        if (!updatedFoodItem) {
            return res.status(404).json({ message: 'Food item not found' });
        }

        res.status(200).json(updatedFoodItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a food item by ID
export const deleteFoodItem = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedFoodItem = await FoodItem.findByIdAndDelete(id);

        if (!deletedFoodItem) {
            return res.status(404).json({ message: 'Food item not found' });
        }

        res.status(200).json({ message: 'Food item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
