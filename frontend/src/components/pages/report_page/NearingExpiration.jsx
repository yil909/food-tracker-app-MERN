import useFoodItemWithAllColumn from "../../../hooks/useFoodItemWithAllColumn.js";
import { useEffect, useState } from "react";
import useGetCurrentTime from "../../../hooks/useGetCurrentTime.js";

const NearingExpiration = () => {
    const { foodItem, getFoodItem } = useFoodItemWithAllColumn();
    const [itemNearExp, setItemNearExp] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await getFoodItem();

            // 对食品项按过期日期进行升序排序
            const sortedItems = [...foodItem].sort((a, b) =>
                new Date(a.expirydate) - new Date(b.expirydate)
            );

            setItemNearExp(sortedItems);
        };

        fetchData();
    }, [getFoodItem]);

  return (
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
        {itemNearExp.length > 0 ? (
            itemNearExp.map((item) => (
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
  );
};

export default NearingExpiration;
