// App.jsx
import React from 'react'
import {Routes, Route} from "react-router-dom";
import './App.css'
import Home from "./components/home/Home.jsx";
import LeftNavBar from "./components/common/LeftNavBar.jsx";
import Guide from './components/pages/Guide.jsx';
import Contact from './components/pages/Contact.jsx'; 
import FoodItemDisplay from './components/pages/Inventory/FoodItemDisplay.jsx';

function App() {
  return (
    <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/guide' element={<Guide />}></Route>
        <Route path='/contact' element={<Contact />}></Route> 
        <Route path='/inventory' element={<FoodItemDisplay />}></Route>
    </Routes>
  )
}

export default App