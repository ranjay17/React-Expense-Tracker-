import React, { useState, useEffect } from "react";
import "./UpdateProfile.css";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const navigate = useNavigate();

  // 🔹 Fetch profile data when component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated. Please log in again.");
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyB-WP2T5JiViDvl3gsbMToJV_zFzn9JL6Y",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken: token }),
          }
        );

        const data = await res.json();
        console.log("🔥 Profile lookup data:", data);

        if (!res.ok) {
          alert("Failed to fetch profile details!");
          return;
        }

        if (data.users && data.users.length > 0) {
          const user = data.users[0];

          // ✅ Fallback to email if name not set
          setName(user.displayName || user.email || "");
          setPhotoUrl(user.photoUrl || "");
        } else {
          alert("No user details found!");
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        alert("Something went wrong while fetching profile!");
      }
    };

    fetchProfile();
  }, [navigate]);

  // 🔹 Update profile data on Firebase
  const handleUpdate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not authenticated. Please log in again.");
      return;
    }

    if (!name || !photoUrl) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB-WP2T5JiViDvl3gsbMToJV_zFzn9JL6Y",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idToken: token,
            displayName: name,
            photoUrl: photoUrl,
            returnSecureToken: true,
          }),
        }
      );

      const data = await res.json();
      console.log("✅ Profile update response:", data);

      if (!res.ok) {
        let msg = "Failed to update profile!";
        if (data.error?.message) msg = data.error.message.replace(/_/g, " ");
        alert(msg);
        return;
      }

      alert("Profile updated successfully!");
      localStorage.setItem("token", data.idToken); // refresh token
      navigate("/home");
    } catch (err) {
      console.error("Update Error:", err);
      alert("Something went wrong!");
    }
  };

  // 🔹 Cancel and go back
  const handleCancel = () => {
    navigate("/home");
  };

  return (
    <div className="update-container">
      <h1 className="update-title">Contact Details</h1>

      <form className="update-form" onSubmit={handleUpdate}>
        <div className="details">
          <label className="label">Email:</label>
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="label">Profile Photo URL:</label>
          <input
            className="input"
            type="text"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
        </div>

        <div className="button-group">
          <button type="submit" className="update-btn">
            Update
          </button>
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>

        <hr className="bottom-line" />
      </form>
    </div>
  );
};

export default UpdateProfile;
