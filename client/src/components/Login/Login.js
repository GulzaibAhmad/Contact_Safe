import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://my-contacts-server-beryl.vercel.app/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();

        const accessToken = data.accessToken;
        localStorage.setItem("accessToken", accessToken);

        navigate("/home");
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Welcome to</h1>
        <h3>Contact Safe</h3>
      </div>
      <div className="login-title">
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />

          <button type="submit" className="login-button">
            Login
          </button>

          <p>
            Don't have an account? <Link to="/">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
