import SQL from 'sql-template-strings';
import { openDatabase } from './database.js';


async function getRestaurantInfo(){
    const db = await openDatabase();
    const restaurantInfo = await db.all(SQL`select * from user`);
    return restaurantInfo;
}

async function updateUserAndRestInfo(id, updatedInfo) {
    const db = await openDatabase();
    const result = await db.run(SQL`
        UPDATE user
        SET restaurantname = ${updatedInfo.restaurantname},
            address = ${updatedInfo.address},
            username = ${updatedInfo.username},
            contact = ${updatedInfo.contact}
        WHERE userid = ${id}
    `);
}

export {getRestaurantInfo, updateUserAndRestInfo};
