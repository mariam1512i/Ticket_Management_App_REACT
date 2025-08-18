const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = "mongodb+srv://mariam:1234@cluster0.lzonp6g.mongodb.net/ticketApp";
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB Atlas");
    console.log("Connected to DB:", mongoose.connection.name);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
