import SQL from 'sql-template-strings';
import { openDatabase } from './database.js'; 

async function getAllFoodItem() {
  const db = await openDatabase();
  const fooditems = await db.all(SQL`
    select * from fooditem
    `);
    //console.log('Food Items: ' + fooditems);
    return fooditems;
}

async function getFoodItemWithAllColumn(){
  const db = await openDatabase();
  const allFoodItems = await db.all(SQL`
    select * from fooditem
  `);
  return allFoodItems;
}

export {
  getAllFoodItem,
  getFoodItemWithAllColumn
};