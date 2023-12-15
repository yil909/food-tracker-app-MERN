// App.jsx
import React from 'react'
import {Routes, Route} from "react-router-dom";
import './App.css'
import Home from "./components/home/Home.jsx";

import ReportPage from "./components/pages/report_page/ReportPage.jsx";
import LeftNavBar from "./components/common/LeftNavBar.jsx";
import Guide from './components/pages/Guide.jsx';
import Contact from './components/pages/Contact.jsx'; 
import FoodItemDisplay from './components/pages/Inventory/FoodItemDisplay.jsx';
import Login from './components/pages/Login/Login.jsx';
import Register from './components/pages/Login/Register.jsx';
import Reset from './components/pages/Login/Reset.jsx';

function App() {
  return (

    <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/guide' element={<Guide />}></Route>
        <Route path='/contact' element={<Contact />}></Route> 
        <Route path='/inventory' element={<FoodItemDisplay />}></Route>
        <Route path='/reports' element={<ReportPage/>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/reset' element={<Reset/>}></Route>
    </Routes>
  )
}

export default App