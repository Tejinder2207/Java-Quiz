// backend/routes/questionRoutes.js
import express from "express";
import Question from "../models/Question.js";

const router = express.Router();

/* ======================
   GET all questions
====================== */
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ======================
   POST - Add new question
====================== */
router.post("/", async (req, res) => {
  try {
    const { unit, question, options, answer, difficulty } = req.body;

    if (!unit || !question || !options || options.length < 2 || !answer) {
      return res.status(400).json({ message: "❌ Missing required fields" });
    }

    const newQuestion = new Question({
      unit,
      question,
      options,
      answer,
      difficulty,
    });

    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ======================
   PUT - Update a question
====================== */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { unit, question, options, answer, difficulty } = req.body;

    const updated = await Question.findByIdAndUpdate(
      id,
      { unit, question, options, answer, difficulty },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "❌ Question not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ======================
   DELETE - Remove a question
====================== */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Question.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "❌ Question not found" });
    }

    res.json({ message: "✅ Question deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
