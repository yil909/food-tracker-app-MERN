//foodItemRoutes.js
import express from "express";
import {
  getFoodItemByUserId,
  updateFoodItem,
  createFoodItem,
  createTransLog,
  getFoodMetricByUserId,
  getFoodItemWithAllColumn,
  getFoodItemsByUserIdAndCategoryName,
  getCookMenuByUserId,
  getIngredientList,
  getMatchedFoodItem,
  getExpiredFoodItem,
} from "../../modules/inventory-dao.js";
import { getItemWithCategoryName } from "../../modules/report-dao.js";
import { getRestaurantInfo } from "../../modules/user-dao.js";

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

router.get("/expiredfooditems", async (req, res) => {
  try {
    const expFoodItems = await getExpiredFoodItem(1);
    res.json(expFoodItems);
    console.log(JSON.stringify(expFoodItems, null, 2));
  } catch (error) {
    console.error("Error retrieving food items:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/fooditemssortbycategory/:categoryname", async (req, res) => {
  try {
    const {categoryname} = req.params;
    const foodItems = await getFoodItemsByUserIdAndCategoryName(1, categoryname)
    res.json(foodItems);
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
    console.log(JSON.stringify(updatedFoodItem, null, 2));
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

router.get("/foodItemWithAllColumn", async (req, res) => {
  try {
    const foodItems = await getFoodItemWithAllColumn();
    res.json(foodItems);
  } catch (error) {
    console.error("Error retrieving food items:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/itemWithCategoryName", async (req, res) => {
  try {
    const itemWithCategoryName = await getItemWithCategoryName();
    res.json(itemWithCategoryName);
  } catch (error) {
    console.error("Error retrieving food items:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/cookmenu", async (req, res) => {
  try {
    const cookMenu = await getCookMenuByUserId(1);
    res.json(cookMenu);
    console.log(JSON.stringify(cookMenu, null, 2));
  } catch (error) {
    console.error("Error retrieving cook menu:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/ingredientList", async (req, res) => {
  try {
    const dishid = req.query.dishid;
    const userid = req.query.userid;

    // Validate if dishid and userid are provided
    if (!dishid || !userid) {
      return res
        .status(400)
        .json({ error: "dishid and userid are required parameters" });
    }
    const ingrdList = await getIngredientList(dishid, userid);
    res.json(ingrdList);
    console.log(JSON.stringify(ingrdList, null, 2));
  } catch (error) {
    console.error("Error retrieving ingredient list:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/cookdish", async (req, res) => {
  try {
    const { dishId, userId } = req.body; // Assuming you are passing dishId and userId in the request body
    const ingrdList = await getIngredientList(dishId, userId);
    console.log("dishId: " + dishId);
    console.log("userId: " + userId);

    // Iterate over each ingredient in the ingrdList
    for (const ingredient of ingrdList) {
      // Find the matched food item using getMatchedFoodItem
      //console.log("ingrd name: " + ingredient.ingredientname);
      const matchedFoodItem = await getMatchedFoodItem(
        ingredient.ingredientname,
        userId
      );
      //console.log("matched item: " + JSON.stringify(matchedFoodItem, null, 2));
      // Check if a matching food item is found
      if (matchedFoodItem) {
        // Extract relevant data from matchedFoodItem
        const [firstMatchedFoodItem] = matchedFoodItem; // Destructuring the first element of the array
        const { fooditemid, fooditem_pricePerUnit, fooditem_expirydate } =
          firstMatchedFoodItem;
        console.log("fooditemid: " + fooditemid);

        // Create transaction data for createTransLog
        const transactionData = {
          userid: userId,
          itemid: fooditemid,
          quantity: ingredient.weight,
          unit: "kg", // Assuming the unit is in kilograms
          pricePerUnit: fooditem_pricePerUnit,
          foodstatus: "USE",
          expirydate: fooditem_expirydate,
        };

        // Create a transaction log for the ingredient
        await createTransLog("USE", transactionData);
      } else {
        console.warn(
          `No matching food item found for ingredient: ${ingredient.ingredientname}`
        );
      }
    }

    res.status(200).send("Dish cooked successfully!");
  } catch (error) {
    console.error("Error cooking dish:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
