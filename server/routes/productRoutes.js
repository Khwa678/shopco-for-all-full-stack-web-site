import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// 🔥 DEBUG
console.log("Product Routes Loaded ✅");

// ✅ GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ✅ GET SINGLE PRODUCT (VERY IMPORTANT)
router.get("/:id", async (req, res) => {
  try {
    console.log("Single Product Route HIT 🔥");

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);

  } catch (err) {
    console.log("ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;