import React from 'react'
import {Routes, Route} from "react-router-dom";
import './App.css'
import Home from "./components/home/Home.jsx";
import ReportPage from "./components/pages/report_page/ReportPage.jsx";

function App() {

  return (
          <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/report' element={<ReportPage/>}></Route>
          </Routes>
  )
}

export default App
