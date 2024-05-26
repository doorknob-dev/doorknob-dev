const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const cors = require("cors");
const pool = require("../db");
const router = express.Router();


app.use(cors());
app.use(express.json());

// Verify user
router.post("/", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Extract token from request headers

    const decoded = jwt.verify(token, "9u23r32f3f9398fj39jfu3"); // Verify token

    const userId = decoded.userId;

    const user = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);

    if (user.rowCount === 1) {
      res.status(200).json({ user: user.rows[0] });
    } else {
      res.status(400).json({ message: "Invalid token" });
    }
  } catch (error) {
    console.error("Error during user verification:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = { router };


