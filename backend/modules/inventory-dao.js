import SQL from 'sql-template-strings';
import { openDatabase } from './database.js'; 

// async function getAuthorByArticleId(id){
//
//     const db = await dbPromise;
//     const author = await db.get(SQL`
//         select u.id, u.username, u.fname, u.lname, u.description, u.profilePhoto
//         from users u, articles a
//         where a.userID = u.id and a.id = ${id}
//     `);
//
//     return author;
//
// }
async function getAllFoodItem() {
  const db = await openDatabase();
  const fooditems = await db.all(SQL`
    select * from fooditem
    `);
    //console.log('Food Items: ' + fooditems);
    return fooditems;
}

export { getAllFoodItem };