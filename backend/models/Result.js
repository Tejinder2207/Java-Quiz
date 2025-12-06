// backend/models/Result.js
import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    user: {
      type: String, // ✅ store username or "Anonymous"
      default: "Anonymous",
    },
    email: {
      type: String, // ✅ store user’s email for filtering
      required: false,
    },
    unit: { type: String, required: true },
    score: { type: Number, required: true },
    total: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Result = mongoose.model("Result", resultSchema);

export default Result;
