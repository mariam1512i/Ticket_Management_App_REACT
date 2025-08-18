import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography, Alert } from "@mui/material";
import "./Signin.css";
import { useNavigate, Link } from "react-router-dom";

function Signin({ setRole }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [generalError, setGeneralError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setGeneralError(""); // reset errors

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (!res.ok) {
        setGeneralError(result.message || "Login failed. Please try again.");
        return;
      }

      // Extract role from returned user object
      if (result.user && result.user.role) {
        setRole(result.user.role);
      }

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setGeneralError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <Typography variant="h5" className="title">Login</Typography>

        {generalError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {generalError}
          </Alert>
        )}

        <TextField
          label="Username"
          {...register("username", { required: "Username is required" })}
          error={!!errors.username}
          helperText={errors.username?.message}
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          label="Password"
          type="password"
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Submit
        </Button>

        <Typography sx={{ mt: 2 }}>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </Typography>
      </form>
    </div>
  );
}

export default Signin;
