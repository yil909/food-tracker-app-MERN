import SQL from 'sql-template-strings';
import { openDatabase } from './database.js'; // 导入数据库连接设置

// 获取食品名称的建议
async function getSuggestedFoodNames(categoryId, prefix) {
  const db = await openDatabase();
  const query = `SELECT itemname FROM categoryassociation WHERE categoryid = ? AND itemname LIKE ?`;
  const foodNames = await db.all(query, [categoryId, prefix + '%']);
  return foodNames.map(row => row.itemname);
}

export { getSuggestedFoodNames };
