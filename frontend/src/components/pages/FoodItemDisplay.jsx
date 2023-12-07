import useFoodItem from "../../hooks/useFoodItem.js"

function FoodItemDisplay() {
  const { foodItem, getFoodItem } = useFoodItem();

  getFoodItem();

  return (
    <div>
      <h2>Food Items</h2>
      <ul>
        {foodItem.map((item) => (
          <li key={item.itemid}>
            {item.name} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FoodItemDisplay;
