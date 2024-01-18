import React, { useEffect, useState } from "react";
import useFoodItem from "../../../hooks/useFoodItem";
import { CloseCircleOutlined } from "@ant-design/icons";
import "./CookMenu.css";

const CookMenu = ({ onClose }) => {
  const { cookMenu, getCookMenu, ingredientList, getIngredientList } =
    useFoodItem();
  const [selectedDishId, setSelectedDishId] = useState(null);

  useEffect(() => {
    getCookMenu();
  }, []);

  useEffect(() => {
    if (selectedDishId !== null) {
      getIngredientList(selectedDishId, 1); // Assuming userid is 1
    }
  }, [selectedDishId]);

  const handleDishSelect = (dishId) => {
    console.log("Selected Dish ID:", dishId);
    setSelectedDishId(dishId);
  };

  // 用来处理点击外部时关闭弹窗的函数
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(); // 调用关闭弹窗的函数
    }
  };

  return (
    <div className="cook-modal-overlay" onClick={handleOverlayClick}>
      <div className="cook-modal-box" onClick={(e) => e.stopPropagation()}>
        <CloseCircleOutlined
          className="cook-modal-close-icon"
          onClick={onClose}
        />
        <h1>Menu</h1>
        <div className="dish-card-container">
          {cookMenu.map((dish) => (
            <div
              key={dish.dishid}
              className={`dish-card ${
                selectedDishId === dish.dishid ? "flipped" : ""
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
                  <input
                    type="radio"
                    name="selectedDish"
                    id={`dish-${dish.dishid}`}
                    onChange={() => handleDishSelect(dish.dishid)}
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
                      {ingredientList.map((ingredient) => (
                        <tr key={ingredient.ingredientname}>
                          <td>{ingredient.ingredientname}</td>
                          <td>{ingredient.weight}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button className="cook-modal-button cook">Cook This</button>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="modal-actions">
          <button className="modal-button close" onClick={onClose}>
            Close
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default CookMenu;
