// routes/authRoutes.js
import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import { registerAdmin, loginAdmin } from "../controllers/adminController.js";

const router = express.Router();

// ✅ User routes
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);

// ✅ Admin routes
router.post("/admin/register", registerAdmin);
router.post("/admin/login", loginAdmin);
// Register User
router.post("/user/register", async (req, res) => {
  try {
    const { name, email, password } = req.body; // ✅ includes name
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({
      _id: user._id,
      name: user.name,  // ✅ return name
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
