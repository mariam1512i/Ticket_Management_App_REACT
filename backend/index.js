const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express(); 

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // React dev server
  credentials: true
}));
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB Atlas
const uri = "mongodb+srv://mariam:1234@cluster0.lzonp6g.mongodb.net/ticketApp";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {console.log("Connected to MongoDB Atlas")
    console.log("Connected to DB:", mongoose.connection.name);

}
)
.catch(err => console.error("MongoDB connection error:", err));



// User schema with role
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ['admin',  'user'], default: 'user' },
  email:    { type: String },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// API route to add a user (signup)
app.post('/api/users', async (req, res) => {
  try {
    const { username, password, role, email } = req.body;
    const newUser = new User({ username, password, role, email });
    await newUser.save();
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (err) {
    res.status(400).json({ message: "Error creating user", error: err.message });
  }
});

// API route for login
app.post('/api/login', async (req, res) => {
  try {
    console.log("Login request body:", req.body);

    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password) { // plain text check (replace with hashing later)
      return res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Test route
app.get('/', (req, res) => {
  res.send("Backend is working");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
