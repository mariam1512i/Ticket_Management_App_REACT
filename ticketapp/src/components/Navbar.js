// Navbar.js
import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar({ role, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout(); // clears role in App
    navigate("/"); // redirect to signin
  };

  // Hide Navbar on login or signup
  if (location.pathname === "/" || location.pathname === "/signup") {
    return null;
  }

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">Ticket App</Typography>
        <Box>
          {role && (
            <Button color="inherit" component={Link} to="/Home">
              Home
            </Button>
          )}
          {role === "admin" && (
            <Button color="inherit" component={Link} to="/dashboard">
              Admin Dashboard
            </Button>
          )}
          {role === "user" && (
            <Button color="inherit" component={Link} to="/dashboard">
              User Dashboard
            </Button>
          )}
          {role && (
            <Button color="inherit" onClick={handleLogoutClick}>
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
