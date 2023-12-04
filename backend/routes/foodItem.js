// Import necessary modules
import express from 'express';
import { FoodItem } from '../models/FoodItem'; // Adjust the path as needed

const router = express.Router();

// CREATE: Add a new food item
router.post('/fooditems', async (req, res) => {
  try {
    const newItem = await FoodItem.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// READ: Get all food items
router.get('/fooditems', async (req, res) => {
  try {
    const items = await FoodItem.find();
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// READ: Get a specific food item by ID
router.get('/fooditems/:id', async (req, res) => {
  try {
    const item = await FoodItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// UPDATE: Update a specific food item by ID
router.put('/fooditems/:id', async (req, res) => {
  try {
    const updatedItem = await FoodItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// DELETE: Delete a specific food item by ID
router.delete('/fooditems/:id', async (req, res) => {
  try {
    const deletedItem = await FoodItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.status(200).json({ message: 'Food item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

export default router;

