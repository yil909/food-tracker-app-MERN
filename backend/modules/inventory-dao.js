import SQL from "sql-template-strings";
import { openDatabase } from "./database.js";

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
async function getFoodItemByUserId(id) {
  const db = await openDatabase();
  const fooditems = await db.all(SQL`
  SELECT
  fi.itemid,
  fi.userid,
  fi.name,
  fi.quantity,
  fi.unit,
  fi.timestamp,
  fi.batchnumber,
  COALESCE(latestTransaction.newexpirydate, fi.expirydate) AS expiryDate,
  ROUND(fi.pricePerUnit, 2) AS pricePerUnit,
  fi.foodcategoryid,
  fc.categoryname,
  fc.description,
  ROUND(julianday(COALESCE(latestTransaction.newexpirydate, fi.expirydate)) - julianday('now')) AS daysUntilExpiry,
  ROUND(SUM(CASE WHEN t.act = 'USE' THEN t.quantity ELSE 0 END), 2) AS usedQuantity,
  ROUND(SUM(CASE WHEN t.act = 'WASTE' THEN t.quantity ELSE 0 END), 2) AS wastedQuantity,
  ROUND((fi.quantity - SUM(CASE WHEN t.act IN ('WASTE', 'USE') THEN t.quantity ELSE 0 END)), 2) AS remainingQuantity
FROM fooditem fi
LEFT JOIN foodcategory fc ON fi.foodCategoryid = fc.categoryid
LEFT JOIN (
  SELECT fooditemid, newexpirydate
  FROM transactionlog
  ORDER BY timestamp DESC
  LIMIT 1
) AS latestTransaction ON fi.itemid = latestTransaction.fooditemid
LEFT JOIN transactionlog t ON fi.itemid = t.fooditemid
WHERE fi.userid = ${id}
GROUP BY fi.itemid, fc.categoryname
ORDER BY daysUntilExpiry;

 `);
  return fooditems;
}

async function getFoodItemsByUserIdAndCategoryName(id, categoryName) {
  const db = await openDatabase();
  const fooditems = await db.all(SQL`
  SELECT
  fi.itemid,
  fi.userid,
  fi.name,
  fi.quantity,
  fi.unit,
  fi.timestamp,
  fi.batchnumber,
  COALESCE(latestTransaction.newexpirydate, fi.expirydate) AS expiryDate,
  round(fi.pricePerUnit,2) AS pricePerUnit,
  fi.foodcategoryid,
  fc.categoryname,
  fc.description,
  round(julianday(COALESCE(t.newexpirydate, fi.expirydate)) - julianday('now')) AS daysUntilExpiry,
  round(SUM(CASE WHEN t.act = 'USE' THEN t.quantity ELSE 0 END),2) AS usedQuantity,
  round(SUM(CASE WHEN t.act = 'WASTE' THEN t.quantity ELSE 0 END),2) AS wastedQuantity,
  round((fi.quantity - SUM(CASE WHEN t.act IN ('WASTE', 'USE') THEN t.quantity ELSE 0 END)),2) AS remainingQuantity
FROM fooditem fi
LEFT JOIN transactionlog t ON fi.itemid = t.fooditemid
LEFT JOIN (
  SELECT fooditemid, newexpirydate
  FROM transactionlog
  ORDER BY timestamp DESC
  LIMIT 1
) AS latestTransaction ON fi.itemid = latestTransaction.fooditemid
LEFT JOIN foodcategory fc on fi.foodCategoryid = fc.categoryid
WHERE fi.userid = ${id} AND fc.categoryname = ${categoryName}
GROUP BY fi.itemid, fc.categoryname
ORDER BY daysUntilExpiry;
 `);
  return fooditems;
}

//--and fi.userid = ${id};
export { getFoodItemByUserId, getFoodItemsByUserIdAndCategoryName };

async function getFoodMetricByUserId(id) {
  const db = await openDatabase();
  const foodmetrics = await db.all(SQL`
  SELECT
  (SELECT count(distinct foodCategoryid) FROM fooditem WHERE userid = ${id}) AS categories,
  (SELECT round(SUM(quantity),2) FROM fooditem WHERE userid = ${id}) AS totalItems,
  (SELECT round(SUM(CASE WHEN act = 'USE' THEN quantity ELSE 0 END),2) FROM transactionlog WHERE timestamp >= date('now', '-7 days') AND userid = ${id}) AS used,
  (SELECT round(SUM(CASE WHEN act = 'WASTE' THEN quantity ELSE 0 END),2) FROM transactionlog WHERE timestamp >= date('now', '-7 days') AND userid = ${id}) AS wasted,
  (SELECT round(SUM(CASE WHEN expirydate < date('now') THEN quantity ELSE 0 END),2) FROM fooditem WHERE userid = ${id}) AS expired,
  (SELECT round(SUM(CASE WHEN expirydate <= date('now', '+28 days') AND quantity > 0 THEN quantity ELSE 0 END),2) FROM fooditem WHERE userid = ${id}) AS highRisk;
 `);
  return foodmetrics;
}
//--and fi.userid = ${id};
export { getFoodMetricByUserId };

async function updateFoodItem(id, updatedFoodItem) {
  const db = await openDatabase();
  const result = await db.run(SQL`
    UPDATE fooditem
    SET name = ${updatedFoodItem.name},
        quantity = ${updatedFoodItem.quantity},
        unit = ${updatedFoodItem.unit},
        pricePerUnit = ${updatedFoodItem.pricePerUnit},
        expirydate = ${updatedFoodItem.expirydate},
        foodCategoryid = ${updatedFoodItem.foodCategoryid},
        timestamp = DATETIME('now'),
        readstatus = ${updatedFoodItem.readstatus}
    WHERE itemid = ${id}`);

  console.log(`${result.changes} rows were updated.`);
}
export { updateFoodItem };

async function createTransLog(foodstatus, updatedFoodItem) {
  const db = await openDatabase();
  const result = await db.run(SQL`
    INSERT INTO transactionlog (
      userid,
      foodItemid,
      quantity,
      unit,
      priceperunit,
      timestamp,
      act,
      newexpirydate
    )
    VALUES (
      ${updatedFoodItem.userid},
      ${updatedFoodItem.itemid},
      ${updatedFoodItem.quantity},
      ${updatedFoodItem.unit},
      ${updatedFoodItem.pricePerUnit},
      DATETIME('now'),
      ${updatedFoodItem.foodstatus},
      ${updatedFoodItem.expirydate})`);

  // Get the auto-generated ID value, and assign it to the user id.
  console.log("trans id: " + result.lastID);
  console.log(`${result.changes} rows were updated.`);
}
export { createTransLog };

async function createFoodItem(newFoodItem) {
  const db = await openDatabase();

  // Get the current date in the format YYYY-MM-DD
  const currentDate = new Date().toISOString().split("T")[0];

  // Get the maximum batch number for the same day and foodCategoryid
  const maxBatchNumberResult = await db.get(SQL`
    SELECT MAX(CAST(SUBSTR(batchnumber, 3) AS INTEGER)) as maxBatchNumber
    FROM fooditem
    WHERE userid = ${newFoodItem.userid}
      AND foodCategoryid = ${newFoodItem.foodCategoryid}
      AND DATE(timestamp) = ${currentDate}
  `);

  // Extract the maximum batch number and increment it
  let newBatchNumber = 1;
  if (maxBatchNumberResult && maxBatchNumberResult.maxBatchNumber) {
    newBatchNumber = Math.min(
      parseInt(maxBatchNumberResult.maxBatchNumber) + 1,
      999
    );
  }

  // Format the batch number as "BN001", "BN002", etc.
  const formattedBatchNumber = `BN${newBatchNumber
    .toString()
    .padStart(3, "0")}`;

  const result = await db.run(SQL`
    INSERT INTO fooditem (
      userid,
      foodCategoryid,
      name,
      quantity,
      unit,
      pricePerUnit,
      timestamp,
      batchnumber,
      expirydate
    )
    VALUES (
      ${newFoodItem.userid},
      ${newFoodItem.foodCategoryid},
      ${newFoodItem.name},
      ${newFoodItem.quantity},
      ${newFoodItem.unit},
      round(${newFoodItem.price / newFoodItem.quantity}),
      DATETIME('now'),
      ${formattedBatchNumber},
      ${newFoodItem.expiryDate}
    )
  `);

  // Get the auto-generated ID value and assign it to the user id.
  console.log("New item id: " + result.lastID);
  console.log(`${result.changes} rows were updated.`);

  const addLogData = {
    userid: newFoodItem.userid,
    itemid: result.lastID,
    quantity: newFoodItem.quantity,
    unit: newFoodItem.unit,
    foodstatus: "ADD",
    expirydate: newFoodItem.expiryDate,
    pricePerUnit: round(newFoodItem.price / newFoodItem.quantity),
  };
  createTransLog("ADD", addLogData);
}
export { createFoodItem };

async function getAllFoodCategory() {
  const db = await openDatabase();
  const foodcategories = await db.all(SQL`
  SELECT fc.categoryid, fc.categoryname, fc.description
  FROM foodcategory fc; 
 `);
  return foodcategories;
}
export { getAllFoodCategory };

async function getWasteByCategory() {
  const db = await openDatabase();
  const wastecategories = await db.all(SQL`
  SELECT
  fc.categoryname,
  SUM( t.quantity) AS wastedQuantity
  FROM fooditem fi
  LEFT JOIN transactionlog t ON fi.itemid = t.fooditemid
  LEFT JOIN foodcategory fc on fi.foodCategoryid = fc.categoryid
  WHERE t.act = 'WASTE'
  GROUP BY fc.categoryname;
 `);
  return wastecategories;
}
export { getWasteByCategory };

async function getUsageWasteOverTime() {
  const db = await openDatabase();
  const usageWaste = await db.all(SQL`
  SELECT
  strftime('%Y-%m', timestamp) AS month,
  SUM(CASE WHEN act = 'USE' THEN quantity ELSE 0 END) AS used,
  SUM(CASE WHEN act = 'WASTE' THEN quantity ELSE 0 END) AS wasted
  FROM transactionlog
  GROUP BY month
  ORDER BY month;
 `);
  return usageWaste;
}
export { getUsageWasteOverTime };

// Function to get location ranking
async function getLocationRanking() {
  const db = await openDatabase();

  // This query assumes that the 'location' column exists in your user table
  const ranking = await db.all(`
    SELECT
      location,
      SUM(t.quantity) AS totalWasted
    FROM
      user u
      LEFT JOIN transactionlog t ON u.userid = t.userid
    WHERE
      t.act = 'WASTE'
    GROUP BY
      location
    ORDER BY
      totalWasted DESC
  `);

  return ranking;
}

export { getLocationRanking };

// async function getFoodItemWithAllColumn() {
//   const db = await openDatabase();
//   const allFoodItems = await db.all(SQL`
//     select * from fooditem
//   `);
//   return allFoodItems;
// }

async function getFoodItemWithAllColumn() {
  const db = await openDatabase();
  const allFoodItems = await db.all(SQL`
    SELECT * FROM fooditem
    WHERE DATE(expirydate) >= DATE('now')
    AND DATE(expirydate) <= DATE('now', '+15 days')
  `);
  return allFoodItems;
}

export { getFoodItemWithAllColumn };

async function getCookMenuByUserId(id) {
  const db = await openDatabase();
  const allMenu = await db.all(SQL`
  select DISTINCT dishid, userid, dishname, dishpic from menu
  WHERE userid = ${id}
  `);
  return allMenu;
}

export { getCookMenuByUserId };

async function getIngredientList(dishid, userid) {
  const db = await openDatabase();
  const ingrdList = await db.all(SQL`
  select ingredientname, weight from menu
  WHERE userid = ${userid}
  AND dishid = ${dishid}
  `);
  return ingrdList;
}

export { getIngredientList };

async function getMatchedFoodItem(foodname, userid) {
  const db = await openDatabase();
  const matchedFoodItem = await db.all(SQL`
  SELECT
  m.dishid,
  m.userid,
  m.dishname,
  m.dishpic,
  m.ingredientname,
  m.weight,
  m.preservationtime,
  f.itemid AS fooditemid,
  f.userid AS fooditem_userid,
  f.foodCategoryid,
  f.name AS fooditem_name,
  f.quantity AS fooditem_quantity,
  f.unit AS fooditem_unit,
  f.timestamp AS fooditem_timestamp,
  f.batchnumber AS fooditem_batchnumber,
  f.expirydate AS fooditem_expirydate,
  f.pricePerUnit AS fooditem_pricePerUnit
FROM
  menu m
JOIN
  fooditem f ON m.ingredientname = f.name
WHERE
  m.userid = ${userid} AND
  m.ingredientname = ${foodname}
ORDER BY
  f.batchnumber ASC 
LIMIT 1; 
  `);
  return matchedFoodItem;
}

export { getMatchedFoodItem };
