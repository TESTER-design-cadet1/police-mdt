import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const handleLogin = (token, user) => {
    setToken(token);
    setUser(user);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
  };

  if (!token) {
    return (
      <div>
        {isRegistering ? (
          <Register onRegister={() => setIsRegistering(false)} />
        ) : (
          <Login onLogin={handleLogin} />
        )}
        <button onClick={() => setIsRegistering(true)}>
          {isRegistering ? "Back to Login" : "Register"}
        </button>
      </div>
    );
  }

  return (
    <div>
      <Dashboard user={user} />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default App;
