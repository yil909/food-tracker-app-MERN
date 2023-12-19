import express from 'express';
import { getAllFoodCategory, getUsageWasteOverTime, getWasteByCategory } from '../../modules/inventory-dao.js';

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


// Route to get wasted food items by category
router.get("/wastemetrics", async (req, res) => {
  try {
    const wasteMetrics = await getWasteByCategory(1);
    res.json(wasteMetrics);
    //console.log(JSON.stringify(wasteMetrics, null, 2));
  } catch (error) {
    console.error("Error retrieving waste metrics:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get wasted food items by category
router.get("/usagewaste", async (req, res) => {
  try {
    const usageWasteOverTime = await getUsageWasteOverTime(1);
    res.json(usageWasteOverTime);
    console.log(JSON.stringify(usageWasteOverTime, null, 2));
  } catch (error) {
    console.error("Error retrieving usage waste", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export default router;