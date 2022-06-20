import React from "react";
import './App.css';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";



function App() {

  return (

    <>
      {/* <Dashboard /> */}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/LOGIN" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>

    </>
  );
}

export default App;
