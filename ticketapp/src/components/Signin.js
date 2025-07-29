import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography } from "@mui/material";
import "./Signin.css";
import { useNavigate } from "react-router-dom";

const users = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "user", password: "user123", role: "user" }
];

function Signin({ setRole }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError, // ✅ import this!
    reset,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const foundUser = users.find(
      (u) => u.username === data.username && u.password === data.password
    );

    if (foundUser) {
      setRole(foundUser.role);
      reset();
      navigate("/Dashboard");
    } else {
      const usernameMatch = users.find((u) => u.username === data.username);
      if (!usernameMatch) {
        setError("username", {
          type: "manual",
          message: "Username not found",
        });
      } else {
        setError("password", {
          type: "manual",
          message: "Incorrect password",
        });
      }
    }
  };

  return (
    <div className="signin-container">
      <form onSubmit={handleSubmit(onSubmit)} className="signin-form">
        <Typography variant="h5" className="signin-title">
          Login
        </Typography>

        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("username", { required: "Username is required" })}
          error={!!errors.username}
          helperText={errors.username?.message}
        />

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Button
          variant="contained"
          type="submit"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Signin;
