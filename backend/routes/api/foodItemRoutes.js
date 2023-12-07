import express from 'express';
import { getAllFoodItem } from '../../modules/inventory-dao.js';

const router = express.Router();

// Route to get all food items
router.get('/fooditems', async (req, res) => {
  try {
    const foodItems = await getAllFoodItem();
    res.json(foodItems);
  } catch (error) {
    console.error('Error retrieving food items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
