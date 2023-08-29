import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddContact from "./components/HomePage/AddContact"; // Import the AddContact component
import HomePage from "./components/HomePage/HomePage";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import Login from "./components/Login/Login"; // Make sure you've imported the Login component

const App = () => {
  return (
    <Router>
      <div>
        <div>
          <Routes>
            <Route path="/" element={<RegistrationForm />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/add-contact" element={<AddContact />} /> {/* Add this route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
