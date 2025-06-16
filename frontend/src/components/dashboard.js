import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

function Dashboard({ user }) {
  const [units, setUnits] = useState([]);

  useEffect(() => {
    // Fetch initial unit data
    fetch("http://localhost:4000/api/units", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => res.json())
      .then(setUnits);

    // Real-time updates
    socket.on("unitStatus", (data) => {
      setUnits(data);
    });

    return () => {
      socket.off("unitStatus");
    };
  }, []);

  const updateStatus = (id, status) => {
    socket.emit("unitStatusUpdate", { id, status });
  };

  return (
    <div>
      <h2>Welcome, {user.username} ({user.role})</h2>
      <h3>Unit Status</h3>
      {units.map(unit => (
        <div key={unit.id}>
          {unit.name}: <b>{unit.status}</b>
          <select
            value={unit.status}
            onChange={e => updateStatus(unit.id, e.target.value)}
          >
            <option>Available</option>
            <option>Busy</option>
            <option>On Call</option>
          </select>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
