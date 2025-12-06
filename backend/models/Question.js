import mongoose from "mongoose";

const questionSchema = mongoose.Schema(
  {
    unit: { type: String, required: true },
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    answer: { type: String, required: true },
    difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "easy" }
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);

export default Question;
