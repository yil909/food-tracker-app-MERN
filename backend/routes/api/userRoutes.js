import express from "express";
import {getRestaurantInfo} from "../../modules/user-dao.js";

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

export default router;