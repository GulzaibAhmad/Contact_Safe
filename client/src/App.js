import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";

const App = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      alert("All fields must be filled!");
      return;
    }

    setUsername("");
    setEmail("");
    setPassword("");
    alert("Form submitted!");

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

    const data = await response.json();

    console.log(data);
  };

  return (
    <Router>
      <div className="container">
        <div className="header">
          <h1>Welcome to</h1>
          <h3>Contact Safe</h3>
        </div>
        <div className="login-title">
          <Routes>
            <Route
              path="/"
              element={
                <form onSubmit={handleSubmit}>
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
              }
            />
            <Route path="/Login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
