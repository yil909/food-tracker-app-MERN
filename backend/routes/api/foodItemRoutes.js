import express from "express";
import {
  getFoodItemByUserId,
  updateFoodItem,
  createFoodItem,
  createTransLog,
  getFoodMetricByUserId,
} from "../../modules/inventory-dao.js";
import {getAllFoodItem, getFoodItemWithAllColumn} from '../../modules/inventory-dao.js';
import {getItemWithCategoryName} from "../../modules/report-dao.js";


const router = express.Router();

// Route to get all food items
router.get("/fooditems", async (req, res) => {
  try {
    const foodItems = await getFoodItemByUserId(1);
    res.json(foodItems);
    //console.log(JSON.stringify(foodItems, null, 2));
  } catch (error) {
    console.error("Error retrieving food items:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/updatefooditems", async (req, res) => {
  try {
    const itemid = req.body.itemid;
    console.log("itemid: " + JSON.stringify(itemid, null, 2));
    const updatedFoodItem = req.body;
    //console.log(JSON.stringify(updatedFoodItem, null, 2));
    await updateFoodItem(itemid, updatedFoodItem);
    console.log("Food item updated successfully!");
    res.status(200).send("Food item updated successfully!");
  } catch (error) {
    console.error("Error updating food item:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/createfooditems", async (req, res) => {
  try {
    
    const newFoodItem = req.body;
    console.log(JSON.stringify(newFoodItem, null, 2));
    await createFoodItem(newFoodItem);
    console.log("Route - Food item created successfully!");
    res.status(200).send("Food item created successfully!");
  } catch (error) {
    console.error("Route - Error creating food item:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/createtranslog", async (req, res) => {
  try {
    const foodstatus = req.body.foodstatus;
    //console.log("foodstatus: " + JSON.stringify(foodstatus, null, 2));
    const updatedFoodItem = req.body;
    //console.log(JSON.stringify(updatedFoodItem, null, 2));
    await createTransLog(foodstatus, updatedFoodItem);
    console.log("TransLog updated successfully!");
    res.status(200).send("TransLog updated successfully!");
  } catch (error) {
    console.error("Error updating TransLog:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/foodmetrics", async (req, res) => {
  try {
    const foodMetrics = await getFoodMetricByUserId(1);
    res.json(foodMetrics);
    //console.log(JSON.stringify(foodMetrics, null, 2));
  } catch (error) {
    console.error("Error retrieving food metrics:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
