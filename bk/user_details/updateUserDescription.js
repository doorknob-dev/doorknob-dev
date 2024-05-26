const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("../db");
const router = express.Router();

app.use(cors());
app.use(express.json());

// Update user details after onboarding
router.put("/:creation_urn", async (req, res) => {
    try {
        const { creation_urn } = req.params;
        const { user_description} = req.body;

        // Update user details
        const userDetails = await pool.query(
            "UPDATE users SET user_description = $1 WHERE creation_urn = $2 RETURNING id",
            [user_description, creation_urn]
        );

        // Check if user was found and updated
        if (userDetails.rows.length === 0) {
            return res.status(404).json({ error: "User not found", message: "No user found with the provided creation_urn." });
        }
        const userId = userDetails.rows[0].id;


        res.status(200).json({ message: "User data updated successfully." });
    } catch (error) {
        console.error("Error updating user details:", error.message);
        res.status(500).json({ error: "Server Error", message: "An error occurred on the server." });
    }
})


module.exports = { router };
