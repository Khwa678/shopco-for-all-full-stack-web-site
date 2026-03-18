import express from "express";

const router = express.Router();

// ✅ TEST SIGNUP ROUTE
router.post("/signup", (req, res) => {
  console.log("Signup hit"); // debug

  res.json({
    message: "Signup working ✅",
    body: req.body
  });
});

export default router;