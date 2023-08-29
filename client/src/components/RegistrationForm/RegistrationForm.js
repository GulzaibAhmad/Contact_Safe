import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./registrationform.css";

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

const RegistrationForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      alert("All fields must be filled!");
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      setEmailError("Invalid email");
      return;
    }

    if (!PASSWORD_REGEX.test(password)) {
      setPasswordError(
        "Password must be minimum 8 characters with at least one uppercase, lowercase, and number"
      );
      return;
    }

    try {
      const response = await fetch(
        "https://my-contacts-server-beryl.vercel.app/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );

      if (response.ok) {
        setUsername("");
        setEmail("");
        setPassword("");
        alert("Registration successful!");
        navigate("/Login"); // Navigate to the login page on successful registration
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="_registration_container">
    <div className="_container">
      <div className="_header">
        <h1>Welcome to</h1>
        <h3>Contact Safe</h3>
      </div>
      <div  className="_login-title">
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
          {emailError && <p className="error-message">{emailError}</p>}
          <div style={{ position: "relative" }}>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
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
          {passwordError && <p className="error-message">{passwordError}</p>}
          <button type="submit">Register</button>
          <p>
            Already have an account? <Link to="/Login">Login</Link>
          </p>
        </form>
      </div>
    </div>
    </div>
  );
};

export default RegistrationForm;
