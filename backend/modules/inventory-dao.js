const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

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