import SQL from 'sql-template-strings';
import { openDatabase } from './database.js';

async function getAllTransactionLog(){
    const db = await openDatabase();
    const allLog = await db.all(SQL`select * from transactionlog`);
    return allLog;
}

async function getItemWithCategoryName(){
    const db = await openDatabase();
    const itemWithFoodCategory = await db.all(SQL`select name, itemid, categoryname, t.quantity, t.priceperunit, act from foodItem i join foodcategory c on c.categoryid = i.foodCategoryid join transactionlog t on t.foodItemid = i.itemid where act = "WASTE";`);

    return itemWithFoodCategory;
}

export { getAllTransactionLog, getItemWithCategoryName };