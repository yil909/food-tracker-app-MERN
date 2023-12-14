import express from 'express';
import { getAllFoodCategory} from '../../modules/inventory-dao.js';

const router = express.Router();

// Route to get all food items
router.get('/foodCategories', async (req, res) => {
  try {
    const foodCategories = await getAllFoodCategory();
    res.json(foodCategories);
    //console.log(JSON.stringify(foodCategories, null, 2));
  } catch (error) {
    console.error('Error retrieving food categories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;