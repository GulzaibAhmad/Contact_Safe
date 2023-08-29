import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("All fields must be filled!");
      return;
    }

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
        alert("Wrong Password or Email!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="_login-container">
      <div className="_container">
        <div className="_header">
          <h1>Welcome to</h1>
          <h3>Contact Safe</h3>
        </div>
        <div className="_login-title">
          <form className="_login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="_login-input"
            />
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="_login-input"
              />
              <span
                style={{
                  position: "absolute",
                  top: "40%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
            <button type="submit" className="_login-button">
              Login
            </button>
            <p>
              Don't have an account? <Link to="/">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
