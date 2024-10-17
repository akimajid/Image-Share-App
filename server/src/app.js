const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoute");
const imageRoutes = require("./routes/imageRoute");
require("dotenv").config();

// Middleware
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/images", imageRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
