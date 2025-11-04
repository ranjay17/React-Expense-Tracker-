import "./Login.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB-WP2T5JiViDvl3gsbMToJV_zFzn9JL6Y",
        {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        let msg = "Authentication failed!";
        if (data.error && data.error.message) {
          msg = data.error.message.replace(/_/g, " ");
        }
        alert(msg);
        return;
      }
      alert("Login successful!");
      navigate('/home')
      console.log("JWT Token:", data.idToken);

      // Store user token 
      localStorage.setItem("token", data.idToken);
    } catch (err) {
      alert("Something went wrong!");
      console.error(err);
    }
  };

  return (
    <div className="main-container">
      <h1>Login</h1>
      <form className="input-form" onSubmit={handleLogin}>
        <div className="email-container">
          <input
            type="text"
            placeholder="Email"
            className="email-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="password-container">
          <input
            type="password"
            placeholder="Password"
            className="password-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="login-btn">
          Login
        </button>

        <Link to="/forgot-password">
          <button type="button" className="forgot-btn">
            Forgot Password
          </button>
        </Link>

        <Link to="/signup">
          <button type="button" className="signup-btn">
            Don't have an account? Signup
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
