const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/authRoute");
const imageRoutes = require("./routes/imageRoute");
const galleryRoutes = require("./routes/galleryRoute");
const galleryImageRoutes = require("./routes/galleryImageRoute");
require("dotenv").config();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json());
app.use("/uploads", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // or specify your frontend origin
  next();
}, express.static("uploads"));


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/galleries", galleryRoutes);
app.use("/api/gallery-images", galleryImageRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
