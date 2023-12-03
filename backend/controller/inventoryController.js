import { Inventory } from "../models/InventoryModel.js";

export async function getAllInventory (){
    const inventory = await Inventory.find({});
    return inventory;
}

export async function createInventory(newInventory){
    const result = await Inventory.create();
    return result;
}


