import React, { useContext, useState } from "react";
import "./SignUp.css";
import {auth} from '../firebase-config.js'
import { createUserWithEmailAndPassword } from "firebase/auth";
import UserContext from "../context/UserContext.jsx";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const{setUser} = useContext(UserContext);

  const handleAddUser = (event) => {
    event.preventDefault();
     if (!email || !password || !confirmPassword) {
       alert("All fields are mandatory!");
       return;
     }
    if (password !== confirmPassword) {
      alert("Password do not match");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const newUser = userCredential.user;
        setUser(newUser);
        alert("User Registered");
        console.log("User has successfully signed up")
      })
      .catch((error) => {
        console.log(error)
        alert(error.message);
      });
      setEmail("")
      setPassword("")
      setConfirmPassword("")
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
            placeholder="password"
            className="password-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="confirm-container">
          <input
            type="password"
            placeholder="confirm password"
            className="confirm-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="signup-btn">
          Sign Up
        </button>
        <button type="button" className="login-btn">
          Have An Account ? Login
        </button>
      </form>
    </div>
  );
};

export default SignUp;
