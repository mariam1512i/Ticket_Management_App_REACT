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

    const result = await res.json(); // always parse JSON

    if (!res.ok) {
      throw new Error(result.message || "Something went wrong");
    }

    setMessage(result.message || "Signup successful");
    navigate("/login");
    reset();
  } catch (err) {
    console.error("Signup error:", err);
    setMessage(err.message || "Signup failed");
  }
};



  return (
    <div className="container">
     
      <form onSubmit={handleSubmit(onSubmit)} className="form">
       <Typography variant="h5" className="title">Sign Up</Typography>
        <TextField fullWidth
          {...register("username", { required: true })}
          label ="Username"
          sx={{ mb: 2 }}
        />
        <TextField fullWidth
          {...register("email" , { required: true})}
          label ="Email"
          type="email"
          sx={{ mb: 2 }}
        />
        <TextField fullWidth
          {...register("password", { required: true })}
          label ="Password"
          type="password"
        />
        
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Sign Up</Button>
        <Typography sx={{ mt: 2 }}>
          Already have an account? <Link to="/signin">Login</Link>
        </Typography>
       {message && (
        <Typography color="error" sx={{ mt: 2 }}>
        {message}
        </Typography>
)}

      </form>
      
    </div>
  );
}

export default Signup
