const express = require("express");
const crypto = require("crypto");
const app = express();
const cors = require("cors");
const pool = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());

router.post("/", async (req, res) => {
    try {
        const { username, password } = req.body;

        // console.log("Received login request:", req.body);


        const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

        const user = result.rows[0];

        // console.log("Database query result:", result.rows);

        if (!user) {
            // console.log("User not found");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Hash the provided password before comparison
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

        if (hashedPassword !== user.hashed_password) {
            // console.log("Password mismatch");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user.id }, '9u23r32f3f9398fj39jfu3', { expiresIn: "1hr" });
        // console.log("Generated token:", token);
        res.json({ token });
    } catch (error) {
        // console.error("Error during login:", error.message);
        res.status(500).json({ message: "Server error" });
    }
});

app.use((err, req, res, next) => {
    // console.error("Internal server error:", err.stack);
    res.status(500).json({ message: "Internal server error" });
});

module.exports = { router };