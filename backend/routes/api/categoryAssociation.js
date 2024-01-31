import express from 'express';
import { getSuggestedFoodNames } from '../../modules/categoryassociation.js'; // 假设控制器已经设置

const router = express.Router();

// 添加一个新的路由来获取建议的食品名称
router.get('/suggest-food-names/:categoryId', async (req, res) => {
  const { categoryId } = req.params;
  const { prefix } = req.query;

  try {
    const suggestions = await getSuggestedFoodNames(categoryId, prefix);
    res.json(suggestions);
  } catch (error) {
    console.error('Error fetching suggested food names:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
