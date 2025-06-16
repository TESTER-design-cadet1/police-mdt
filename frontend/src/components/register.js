import React, { useState } from "react";

function Register({ onRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("officer");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role })
    });
    const data = await response.json();
    if (data.message) {
      onRegister(); // Switch back to login
    } else {
      alert(data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} /><br />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /><br />
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="officer">Officer</option>
        <option value="dispatcher">Dispatcher</option>
        <option value="admin">Admin</option>
      </select><br />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
