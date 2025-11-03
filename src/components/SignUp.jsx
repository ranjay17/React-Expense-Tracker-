import React, { useContext, useState } from "react";
import "./SignUp.css";
import UserContext from "../context/UserContext.jsx";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { setUser } = useContext(UserContext);

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
      // Firebase REST signup API
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
        if (data.error && data.error.message) {
          msg = data.error.message.replace(/_/g, " ");
        }
        alert(msg);
        return;
      }

      alert("Signup successful!");
      console.log("User has successfully signed up");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Store user info in context
      setUser({ email: data.email, idToken: data.idToken });
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again!");
    }
  };

  return (
    <div className="main-container">
      <h1>Sign Up</h1>
      <form className="input-form" onSubmit={handleAddUser}>
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

        <div className="confirm-container">
          <input
            type="password"
            placeholder="Confirm Password"
            className="confirm-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

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
