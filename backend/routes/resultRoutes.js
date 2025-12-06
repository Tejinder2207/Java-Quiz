// backend/routes/resultRoutes.js
import express from "express";
import Result from "../models/Result.js";

const router = express.Router();

// ✅ POST - Save quiz result
router.post("/", async (req, res) => {
  try {
    const { user, email, unit, score, total, date } = req.body;

    if (!unit || score === undefined || total === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newResult = new Result({
      user: user || "Anonymous",
      email,
      unit,
      score,
      total,
      date: date || new Date(),
    });

    await newResult.save();
    res.status(201).json({ message: "Result saved successfully", result: newResult });
  } catch (error) {
    console.error("❌ Error saving result:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ GET - Fetch results (optionally filtered by user email)
router.get("/", async (req, res) => {
  try {
    const { email } = req.query;
    let results;

    if (email) {
      // only return results for the logged-in user's email
      results = await Result.find({ email }).sort({ date: -1 });
    } else {
      // admin view - return all results
      results = await Result.find().sort({ date: -1 });
    }

    res.json(results);
  } catch (error) {
    console.error("❌ Error fetching results:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
