import React, { useState } from "react";
import App from '../App'

const UserForm = ({ onUserFetched }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username) return;

    try {
      const res = await fetch("http://localhost:5000/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const data = await res.json();
      onUserFetched(data);
      setUsername("");
    } catch (error) {
      alert("User not found or server error.");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "1rem", textAlign: "center" }}>
      <input
        type="text"
        placeholder="Enter LeetCode username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: "0.5rem", marginRight: "1rem" }}
      />
      <button type="submit" style={{ padding: "0.5rem 1rem" }}>Fetch Profile</button>
    </form>
  );
};

export default UserForm;
