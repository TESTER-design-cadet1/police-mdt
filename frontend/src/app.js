import React, { useEffect, useState } from "react";

function App() {
  const [units, setUnits] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/units")
      .then(res => res.json())
      .then(setUnits);
  }, []);

  const updateStatus = (id, status) => {
    fetch(`http://localhost:4000/api/units/${id}/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    })
      .then(res => res.json())
      .then(updated => setUnits(units.map(u => u.id === updated.id ? updated : u)));
  };

  return (
    <div style={{padding: 20}}>
      <h1>Police MDT - Unit Status</h1>
      {units.map(unit => (
        <div key={unit.id} style={{marginBottom: 10}}>
          <span>{unit.name}: <b>{unit.status}</b></span>
          <select
            value={unit.status}
            onChange={e => updateStatus(unit.id, e.target.value)}
            style={{marginLeft: 10}}
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

export default App;
