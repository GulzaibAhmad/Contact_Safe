import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import HomePage from "./components/HomePage/HomePage"; // Import HomePage

const App = () => {
  return (
    <Router>
      <div className="container">
        <div className="header">
          <h1>Welcome to</h1>
          <h3>Contact Safe</h3>
        </div>
        <div className="login-title">
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

const RegistrationForm = () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      alert("All fields must be filled!");
      return;
    }

    try {
      const response = await fetch("https://my-contacts-server-beryl.vercel.app/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (response.ok) {
        setUsername("");
        setEmail("");
        setPassword("");
        alert("Registration successful!");
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleRegistration}>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="Username"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <button type="submit">Register</button>
      <p>
        Already have an account? <Link to="/Login">Login</Link>
      </p>
    </form>
  );
};

export default App;
