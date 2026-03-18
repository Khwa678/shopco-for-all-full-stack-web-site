import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";

import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();

// middleware
app.use(cors());
app.use("/api/payment", paymentRoutes);

app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
// 🔥 SIMPLE SIGNUP
app.post("/signup", (req, res) => {
  console.log("Signup hit");

  res.json({
    message: "Signup working ✅",
    user: req.body
  });
});

// 🔥 SIMPLE LOGIN
app.post("/login", (req, res) => {
  console.log("Login hit");

  res.json({
    message: "Login working ✅",
    token: "dummy-token"
  });
});
app.use("/api/auth", authRoutes);
console.log("Auth route loaded");
// connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/fashion")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});