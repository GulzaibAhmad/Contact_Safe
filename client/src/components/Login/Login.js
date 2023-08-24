import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import './login.css';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });
      
      if(response.ok) {
        const data = await response.json();

        // Get access token from response
        const accessToken = data.accessToken; 
        console.log(accessToken);

        // Store token in localStorage
        localStorage.setItem("accessToken", accessToken);

        // Redirect to homepage
      } else {
        console.log("Login failed");
      }
      
    } catch(error) {
      console.log(error);
    }
  };

  return (
    <div>
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

        {/* Link to the registration page */}
        <p>
          Don't have an account? <Link to="/">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
