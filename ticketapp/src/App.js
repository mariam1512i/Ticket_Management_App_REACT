// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Signin from "./components/Signin";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Signup from "./components/Signup";

function App() {
  const [role, setRole] = useState('');

  const handleLogout = () => {
    setRole(null);
  
  };

  return (
    <div className="App">
      <Router>
        <Navbar role={role} onLogout={handleLogout} /> 
        <Routes>
          <Route path="/" element={<Signin setRole={setRole} />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              role === "admin" ? (
                <AdminDashboard />
              ) : role === "user" ? (
                <UserDashboard />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route path="/Home" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
