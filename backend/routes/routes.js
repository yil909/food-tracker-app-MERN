import express from 'express';
<<<<<<< Updated upstream
import { Inventory } from "../models/mongodbModel.js";
import {createInventory, getAllInventory} from '../controller/inventoryController.js';
=======
import {createInventory, getAllInventory, updateInventory, deleteInventory} from '../controller/inventoryController.js';
>>>>>>> Stashed changes

const router = express.Router();

//route to get all inventory
router.get('/', async (request, response) => {
    try {
        const inventory = await getAllInventory();

        return response.status(200).json({
            inventory,
            }
        );
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//route to create inventory
router.post('/', async (req, res) => {
    try {
        if (
            !req.body.category ||
            !req.body.price ||
            !req.body.item ||
            !req.body.weight ||
            !req.body.expDate
        ) {
            return res.status(400).send({
                message: 'Send all required fields',
            });
        }
        const newInventory = {
            category: req.body.category,
            price: req.body.price,
            item: req.body.item,
            weight: req.body.weight,
            expDate: req.body.expDate
        };

        const inventory = await createInventory(newInventory);

        return res.status(201).send(inventory);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route for Update
router.put('/:id', async (req, res) => {
    try {
        if (
            !req.body.category ||
            !req.body.price ||
            !req.body.item ||
            !req.body.weight ||
            !req.body.expDate
        ) {
            return res.status(400).send({
                message: 'Send all required fields',
            });
        }

        const { id } = req.params;

        const result = await Inventory.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ message: 'Record not found' });
        }

        return res.status(200).send({ message: 'Inventory updated successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route for Delete
router.delete('/:id', async (req, res) => {
    try {
        const { id } = request.params;

        const result = await Inventory.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Record not found' });
        }

        return res.status(200).send({ message: 'Deleted successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});


export default router;
