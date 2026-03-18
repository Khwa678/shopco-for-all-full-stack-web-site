import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// SAVE ORDER
router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();

    res.json({ message: "Order saved ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;