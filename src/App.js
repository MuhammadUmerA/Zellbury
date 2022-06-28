import React, { useState, useEffect } from "react";
import './App.css';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";



function App(props) {
  const [toggleStat, setToggleStat] = useState("");
  // const [auth, setAuth] = useState("");

  // useEffect(() => {

    const pull_data = (data) => {
      console.log(data); // LOGS DATA FROM CHILD (My name is Dean Winchester... &)
      setToggleStat(data)

      // setAuth(data)
    }
  // }, [])

  return (

    <>
      <Routes>
        <Route path="/" element={<Login func={pull_data} />} />
        <Route path="/LOGIN" element={<Login func={pull_data} />} />
        <Route path="/Dashboard" element={<Dashboard datae={toggleStat} />} />
        <Route path="*" element={<Login func={pull_data} />} />
      </Routes>
    </>
  );
}

export default App;
