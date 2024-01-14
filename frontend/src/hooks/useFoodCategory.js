import { useState } from "react";
import axios from "axios";
import { LOCAL_IP, PORT } from "../../../backend/config";

function useFoodCategory() {
  const [foodCategory, setFoodCategory] = useState([]);

  const getFoodCategory = async () => {
    try {
      const response = await axios.get('http://'+LOCAL_IP+':'+PORT+'/foodcategories');
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

