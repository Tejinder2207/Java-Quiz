// backend/utils/generateToken.js
import jwt from "jsonwebtoken";

// 🔑 Function to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Token valid for 30 days
  });
};

export default generateToken;
