import { useState } from "react";
import axios from "axios";

function useFoodCategory() {
  const [foodCategory, setFoodCategory] = useState([]);

  const getFoodCategory = async () => {
    try {
      const response = await axios.get("http://localhost:5555/foodcategories");
      setFoodCategory(response.data);
    } catch (error) {
      console.error("Error fetching FoodCat data:", error);
    }
  };

  return {
    foodCategory,
    getFoodCategory,
  };
}

export default useFoodCategory;

