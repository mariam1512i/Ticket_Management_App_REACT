// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signin from "./components/Signin/Signin";
import AdminDashboard from "./components/Dashboards/AdminDashboard";
import UserDashboard from "./components/Dashboards/UserDashboard";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Signup from "./components/Signup/Signup";
import ProtectedRoute from "./components/Home/ProtectedRoute";

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
          <Route
            path="/home"
            element={
            <ProtectedRoute role={role}>
            <Home />
            </ProtectedRoute>
                    }
            />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
