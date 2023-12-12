import express from 'express';
import {getAllFoodItem, getFoodItemWithAllColumn} from '../../modules/inventory-dao.js';
import {getItemWithCategoryName} from "../../modules/report-dao.js";

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

router.get('/foodItemWithAllColumn', async (req, res) =>{
  try{
    const foodItems = await getFoodItemWithAllColumn();
    res.json(foodItems);
  }catch (error){
    console.error('Error retrieving food items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/itemWithCategoryName', async (req, res) =>{
  try{
    const itemWithCategoryName = await getItemWithCategoryName();
    res.json(itemWithCategoryName);
  }catch (error){
    console.error('Error retrieving food items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
export default router;
