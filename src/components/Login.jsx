import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB-WP2T5JiViDvl3gsbMToJV_zFzn9JL6Y`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      );
      dispatch(login({ token: res.data.idToken, userId: res.data.localId }));
      navigate("/home");
    } catch (error) {
      alert("Invalid credentials!");
      console.error(error);
    }
  };

  return (
    <div className="main-container">
      <h1>Login</h1>
      <form className="input-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="email-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="password-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login-btn">
          Login
        </button>

        <Link to="/forgot-password">
          <button type="button" className="forgot-btn">
            Forgot Password?
          </button>
        </Link>

        <Link to="/signup">
          <button type="button" className="signup-btn">
            Don’t have an account? Sign Up
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
