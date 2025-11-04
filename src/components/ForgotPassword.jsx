import React, { useState } from "react";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendLink = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB-WP2T5JiViDvl3gsbMToJV_zFzn9JL6Y",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: email,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage(
          "Email Sent. Open the link and change the password."
        );
      } else {
        if (data.error?.message === "EMAIL_NOT_FOUND") {
          setMessage("No account found with this email.");
        } else {
          setMessage(`Error: ${data.error?.message}`);
        }
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-container">
      <h2>Forgot Password</h2>
      <p>Enter the email with which you have registered:</p>

      <form onSubmit={handleSendLink}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Link"}
        </button>
      </form>

      {message && <p className="response-message">{message}</p>}
    </div>
  );
};

export default ForgotPassword;
