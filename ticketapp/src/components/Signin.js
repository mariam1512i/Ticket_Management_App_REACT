import React ,{ useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";


// Simulated user
const hardcodedUser = {
  username: "admin",
  password: "admin123"
};

function Signin() {
  // State for form inputs and error message
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] =  useState('');

  // Handle form submission
 const handleSubmit = (e) => {
  e.preventDefault();
  
  if (!username || !password) {
    setError("Both fields are required.");
    return;
  }

  if (
    username === hardcodedUser.username &&
    password === hardcodedUser.password
  ) {
    setError(" ");
    setSuccess("Login successful!");
  } else {
    setSuccess(" ");
    setError("Invalid username or password.");
  }
};

  return (
    <Box
      sx={{

        backgroundImage: 'url("/imgs/bg.jpeg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        p: 3
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: "white",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          maxWidth: 400,
          width: "100%"
        }}
      >
        <Typography variant="h5" mb={2}>
          Login
        </Typography>

        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
        <Typography color="error" mt={1}>
         {error}
        </Typography>
        )}

        {success && (
        <Typography color="primary" mt={1}>
        {success}
        </Typography>
        )}


        <Button
          variant="contained"
          type="submit"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default Signin;
