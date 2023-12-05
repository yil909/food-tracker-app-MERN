import { Inventory } from "../models/mongodbModel.js";

export async function getAllInventory (){
    const inventory = await Inventory.find({});
    return inventory;
}

export async function createInventory(newInventory){
    const result = await Inventory.create();
    return result;
}

export async function updateInventory (id, updateData){
    try {
        const result = await Inventory.findByIdAndUpdate(id, updateData, { new: true });
        if (!result) {
            throw new Error('Record not found');
        }
        return result;
    } catch (error) {
        console.error(error.message);
        throw error; // Rethrow the error to be handled by the caller
    }
}

export async function deleteInventory(id) {
    try {
        const result = await Inventory.findByIdAndDelete(id);
        if (!result) {
            throw new Error('Record not found');
        }
        return result;
    } catch (error) {
        console.error(error.message);
        throw error; // Rethrow the error to be handled by the caller
    }
}
