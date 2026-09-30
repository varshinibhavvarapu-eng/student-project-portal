require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const projectRoutes = require("./routes/projectRoutes");
const app = express();
app.use(cors());
app.use(express.json());

// 👇 ఇక్కడ ఈ కొత్త లైన్స్ యాడ్ చేయి
app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
app.use("/api/projects", projectRoutes);
console.log("Routes registered:", app._router ? app._router.stack.length : "NO ROUTER");
app.get("/", (req, res) => {
  res.send("Server is running...");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));