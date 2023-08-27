import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Remove the Link import
import "./App.css";
import Login from "./components/Login/Login";
import HomePage from "./components/HomePage/HomePage";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm"; // Import the RegistrationForm component

const App = () => {
  return (
    <Router>
      <div>
        <div>
          <Routes>
            <Route path="/" element={<RegistrationForm />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
