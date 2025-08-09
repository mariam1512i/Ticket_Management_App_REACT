import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography} from "@mui/material";
import { useNavigate , Link} from "react-router-dom";

function Signup() {
  const { register, handleSubmit, reset } = useForm();
  const [message, setMessage] = React.useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        const errorText = await res.text(); // read as text first
        throw new Error(`Server error (${res.status}): ${errorText}`);
      }

      const result = await res.json();
      setMessage(` ${result.message}`);
      navigate("/login");
     
      reset(); // clear the form
    } catch (err) {
      console.error("Signup error:", err);
      setMessage(` Signup failed: ${err.message}`);
    }
  };

  return (
    <div className="container">
      <Typography variant="h5">Sign Up</Typography>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <TextField fullWidth
          {...register("username", { required: true })}
          placeholder="Username"
        />
        <TextField fullWidth
          {...register("email")}
          placeholder="Email"
          type="email"
        />
        <TextField fullWidth
          {...register("password", { required: true })}
          placeholder="Password"
          type="password"
        />
        
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Sign Up</Button>
        <Typography sx={{ mt: 2 }}>
          Already have an account? <Link to="/signin">Sign in</Link>
        </Typography>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Signup
