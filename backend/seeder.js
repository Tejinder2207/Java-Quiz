import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import Question from "./models/Question.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const __dirname = path.resolve();
const questionsFilePath = path.join(__dirname, "backend", "data", "questions.json");
const questionsData = JSON.parse(fs.readFileSync(questionsFilePath, "utf-8"));

const importData = async () => {
  try {
    await Question.deleteMany();
    await Question.insertMany(questionsData);
    console.log("✅ Questions Imported Successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error importing data:", error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Question.deleteMany();
    console.log("🗑 All questions removed!");
    process.exit();
  } catch (error) {
    console.error("❌ Error deleting data:", error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
