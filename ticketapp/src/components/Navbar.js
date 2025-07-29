// Navbar.js
import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar({ role, onLogout }) {
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
            <Button color="inherit" onClick={onLogout}>
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
