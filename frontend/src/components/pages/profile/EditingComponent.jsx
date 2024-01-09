import React, { useState, useEffect } from 'react';

const EditingComponent = (props) => {
    // Initialize info as an object
    const [info, setInfo] = useState({});

    // Update local state when props.restProp changes
    useEffect(() => {
        setInfo(props.restProp || {});
    }, [props.restProp]);

    // Handle input field changes
    const inputChangeHandler = (e, field) => {
        const updatedInfo = {
            ...info,
            [field]: e.target.value
        };

        setInfo(updatedInfo);

        // Pass the updated info directly
        props.onInfoChange(updatedInfo);
    };


    return (
        <div>
            <h2>Restaurant Detail</h2>
            <label htmlFor="restaurantName">Restaurant Name: </label>
            <input
                type="text"
                id="restaurantName"
                value={info.restaurantname || ''}
                onChange={(e) => inputChangeHandler(e, 'restaurantname')}
            />

            <label htmlFor="restaurantAddress">Restaurant Address: </label>
            <input
                type="text"
                id="restaurantAddress"
                value={info.address || ''}
                onChange={(e) => inputChangeHandler(e, 'address')}
            />

            <h2>User Detail: </h2>
            <label htmlFor="username">Username: </label>
            <input
                type="text"
                id="username"
                value={info.username || ''}
                onChange={(e) => inputChangeHandler(e, 'username')}
            />
            <label htmlFor="contact">Contact: </label>
            <input
                type="text"
                id="contact"
                value={info.contact || ''}
                onChange={(e) => inputChangeHandler(e, 'contact')}
            />
        </div>
    );
}

export default EditingComponent;
