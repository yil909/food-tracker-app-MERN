import useFoodItemWithAllColumn from "../../../hooks/useFoodItemWithAllColumn.js";
import { useEffect, useState } from "react";
import useGetCurrentTime from "../../../hooks/useGetCurrentTime.js";

const NearingExpiration = () => {
    const { foodItem, getFoodItem } = useFoodItemWithAllColumn();
    const currentTime = useGetCurrentTime();
    const fifteenDaysInMilliseconds = 15 * 24 * 60 * 60 * 1000;
    const [itemNearExp, setItemNearExp] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await getFoodItem();
            const itemsNearExp = foodItem.filter(item => {
                const expiryDate = new Date(item.expirydate);
                const timeDiff = expiryDate - currentTime;
                return timeDiff < fifteenDaysInMilliseconds;
            });

            setItemNearExp(itemsNearExp);
        };

        fetchData();
    }, [getFoodItem, foodItem, currentTime]);

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
}

export default NearingExpiration;
