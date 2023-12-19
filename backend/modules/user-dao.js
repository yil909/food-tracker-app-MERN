import SQL from 'sql-template-strings';
import { openDatabase } from './database.js';


async function getRestaurantInfo(){
    const db = await openDatabase();
    const restaurantInfo = await db.all(SQL`select * from user`);
    return restaurantInfo;
}

export {getRestaurantInfo};
