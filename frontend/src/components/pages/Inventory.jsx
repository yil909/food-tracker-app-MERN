import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Inventory = () => {
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5555/foodCat');
                console.log(response.data); // Log the response data
                if (response.data && Array.isArray(response.data.inventory)) {
                    setInventory(response.data.inventory); // Set to the array inside the response
                } else {
                    // Handle the case where data is not in the expected format
                    console.error('Data received is not in the expected format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Inventory</h1>
            <table>
                <thead>
                <tr>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Item</th>
                    <th>Weight</th>
                    <th>Exp Date</th>
                </tr>
                </thead>
                <tbody>
                {inventory.map((item, index) => (
                    <tr key={index}>
                        <td>{item.category}</td>
                        <td>{item.price}</td>
                        <td>{item.item}</td>
                        <td>{item.weight}</td>
                        <td>{new Date(item.expDate).toLocaleDateString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Inventory;


