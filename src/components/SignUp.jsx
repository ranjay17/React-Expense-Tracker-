import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import "./SignUp.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddUser = async (event) => {
    event.preventDefault();

    if (!email || !password || !confirmPassword) {
      alert("All fields are mandatory!");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB-WP2T5JiViDvl3gsbMToJV_zFzn9JL6Y",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        let msg = "Signup failed!";
        if (data.error?.message) msg = data.error.message.replace(/_/g, " ");
        alert(msg);
        return;
      }

      alert("Signup successful!");
      dispatch(login({ token: data.idToken, userId: data.localId }));
      navigate("/home");
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="main-container">
      <h1>Sign Up</h1>
      <form className="input-form" onSubmit={handleAddUser}>
        <input
          type="text"
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

        <input
          type="password"
          placeholder="Confirm Password"
          className="confirm-input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button type="submit" className="signup-btn">
          Sign Up
        </button>

        <Link to="/login">
          <button type="button" className="login-btn">
            Have An Account? Login
          </button>
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
