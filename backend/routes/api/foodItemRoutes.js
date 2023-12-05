import express from 'express';
import {getAllFoodCategory} from '../../controller/foodCategoryController.js';

const router = express.Router();

//route to get all inventory
router.get('/', async (request, response) => {
    try {
        const foodCat = await getAllFoodCategory();

        return response.status(200).json({
            foodCat,
            }
        );
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;