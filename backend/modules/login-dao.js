import SQL from 'sql-template-strings';
import { openDatabase } from './database.js';
import bcrypt from "bcrypt";

export async function getUserById(userId) {
    const db = await openDatabase();
    return await db.get(SQL`SELECT * FROM user WHERE userid = ${userId}`);
}

export async function getUserByName(username) {
    const db = await openDatabase();
    return await db.get(SQL`SELECT * FROM user WHERE username = ${username}`);
}
export async function saveUser(user) {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(user.password, salt);
        const authToken = '-1';
        const db = await openDatabase();
        return await db.run(SQL`INSERT INTO "user" ("username", "hashpw", "saltpw", "authToken", "is_admin", "restaurantname", "address", "location", "contact") VALUES (${user.username}, ${hashedPassword}, ${salt}, ${authToken}, 0, ${user.restaurantName}, ${user.address}, ${user.city}, ${user.contact});`);
    } catch (error) {
        // Handle errors here
        console.error("Error in saveUser:", error);
        throw error;
    }
}

export async function updateUser(user) {
    const salt = await bcrypt.genSaltSync();
    const hashedPassword = await bcrypt.hashSync(user.hashpw, salt);
    const db = await openDatabase();
    return await db.run(SQL`UPDATE "user" SET "hashpw" = ${hashedPassword}, "saltpw" = ${salt} WHERE "userid" = ${user.userid};`);
}

