import useFoodItemWithAllColumn from "../../../hooks/useFoodItemWithAllColumn.js";
import { useEffect, useState } from "react";
//import useGetCurrentTime from "../../../hooks/useGetCurrentTime.js";
import "./NearingExpiration.css";

const NearingExpiration = () => {
  const { foodItem, getFoodItem } = useFoodItemWithAllColumn();
  const [itemNearExp, setItemNearExp] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await getFoodItem();

      const sortedItems = [...foodItem].sort(
        (a, b) => new Date(a.expirydate) - new Date(b.expirydate)
      );

      setItemNearExp(sortedItems);
    };

    fetchData();
  }, [getFoodItem]);

  const displayedItems = showAll ? itemNearExp : itemNearExp.slice(0, 5);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Amount</th>
            <th>Expiration Date</th>
            <th>Projected Waste Cost</th>
          </tr>
        </thead>
        <tbody>
          {displayedItems.length > 0 ? (
            displayedItems.map((item) => (
              <tr key={item.itemid}>
                <td>{item.name}</td>
                <td>{`${item.quantity} ${item.unit}`}</td>
                <td>{item.expirydate}</td>
                <td>{`$${(item.pricePerUnit * item.quantity).toFixed(2)}`}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No items nearing expiration</td>
            </tr>
          )}
        </tbody>
      </table>
      {itemNearExp.length > 5 && (
        <a
          href="#!"
          className="see-all-link"
          onClick={() => setShowAll(!showAll)}
          style={{ float: "right", color: "#2c94fc", textDecoration: "none" }}
        >
          {showAll ? "See Less" : "See All"}
        </a>
      )}
    </div>
  );
};

export default NearingExpiration;
