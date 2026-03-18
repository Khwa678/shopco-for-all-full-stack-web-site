import express from "express";
import Razorpay from "razorpay";

const router = express.Router();

const razorpay = new Razorpay({
  key_id: "rzp_test_1DP5mmOlF5G5ag",
  key_secret: "secret123",
});

router.post("/create-order", async (req, res) => {
  try {
    console.log("BODY:", req.body); // 🔥 debug

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
    };

    const order = await razorpay.orders.create(options);

    console.log("ORDER CREATED:", order); // 🔥 debug

    res.json(order);

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json(err);
  }
});

export default router;