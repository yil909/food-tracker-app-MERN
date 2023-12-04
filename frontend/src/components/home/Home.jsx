import Inventory from "../pages/Inventory.jsx";
import LeftNavBar from "../common/LeftNavBar.jsx";
import React from "react";

const Home = () => {
    return (
        <>
            <LeftNavBar />
            <Inventory/>
        </>
    );
}

export default Home;