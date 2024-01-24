// CookMenu.jsx
import React, { useEffect, useState } from "react";
import useFoodItem from "../../../hooks/useFoodItem";
import "./CookMenu.css";

// ... (imports and other code)

const CookMenu = ({ onClose }) => {
  const { cookMenu, getCookMenu, cookDish } = useFoodItem();
  const [selectedDishId, setSelectedDishId] = useState(null);
  const [flippedCards, setFlippedCards] = useState([]);

  useEffect(() => {
    getCookMenu();
  }, []);

  const handleDishSelect = (dishId) => {
    // Implement logic for handling the selected dish
    console.log("Selected Dish ID:", dishId);

    // Update the selected dish id
    setSelectedDishId(dishId);

    // Update the flipped cards state
    setFlippedCards((prevFlippedCards) => [...prevFlippedCards, dishId]);
  };

  const handleCookClick = () => {
    if (selectedDishId !== null) {
      // Cook the selected dish
      cookDish(selectedDishId, 1); // Assuming userid is 1
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h1> Menu</h1>
        <div className="dish-card-container">
          {cookMenu.map((dish) => (
            <div
            key={dish.dishid}
            className={`dish-card ${
              flippedCards.includes(dish.dishid) ? "flipped" : ""
            }`}
            >
              <div
                className="dish-front"
                onClick={() => handleDishSelect(dish.dishid)}
              >
                <label className="dish-label">
                  <img
                    src={`./images/dishes/${dish.dishpic}`}
                    alt={dish.dishname}
                  />
                  
                  <h5>{dish.dishname}</h5>
                </label>
              </div>
              <div className="dish-back">
                <div className="ingredient-list">
                  <table>
                    <thead>
                      <tr>
                        <th>Ingredient</th>
                        <th>Weight(KG)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dish.ingredients.map((ingredient) => (
                        <tr key={ingredient.ingredientname}>
                          <td>{ingredient.ingredientname}</td>
                          <td>{ingredient.weight}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button className="modal-button cook" onClick={handleCookClick}>
                  Cook This
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="modal-actions">
          <button className="modal-button close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookMenu;
