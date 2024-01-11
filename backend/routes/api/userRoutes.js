import express from "express";
import {getRestaurantInfo, updateUserAndRestInfo} from "../../modules/user-dao.js";
import {updateFoodItem} from "../../modules/inventory-dao.js";


const router = express.Router();

router.get('/restInfo', async (req, res) => {
    try {
        const restInfo = await getRestaurantInfo();
        res.json(restInfo);
    } catch (error) {
        console.error('Error retrieving food items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put("/updateRestInfo", async (req, res) => {
    try {
        const updatedRestInfo = req.body;
        const userid = req.body.userid;
        await updateUserAndRestInfo(userid, updatedRestInfo);
        res.status(200).send("Information updated successfully!");
    } catch (error) {
        console.error("Error updating user information:", error);
        res.status(500).send("Internal Server Error");
    }
});

export default router;