import express from 'express';
import {getAllTransactionLog} from "../../modules/report-dao.js";

const router = express.Router();

router.get('/allLog', async (req, res) => {
    try {
        const allLogs = await getAllTransactionLog();
        res.json(allLogs);
    } catch (error) {
        console.error('Error retrieving food items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;