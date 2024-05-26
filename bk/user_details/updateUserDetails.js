const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("../db");
const router = express.Router();

app.use(cors());
app.use(express.json());

// Update user details after onboarding
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { first_name, last_name, occupation_code, languages, profile_image_url } = req.body;

        const occupationResult = await pool.query("SELECT id FROM user_occupation WHERE code = $1", [occupation_code]);
        if (occupationResult.rows.length === 0) {
            return res.status(400).json({ error: "Invalid occupation code", message: "No occupation found with the provided code." });
        }
        const occupationId = occupationResult.rows[0].id;

        // Update user details
        const userDetails = await pool.query(
            "UPDATE users SET first_name = $1, last_name = $2, user_occupation_id = $3, profile_image_url = $4 WHERE id = $5 RETURNING id",
            [first_name, last_name, occupationId, profile_image_url, id]
        );

        // Check if user was found and updated
        if (userDetails.rows.length === 0) {
            return res.status(404).json({ error: "User not found", message: "No user found with the provided user id." });
        }
        const userId = userDetails.rows[0].id;

        // Add languages if provided
        // if (languages) {
        //     const languageNames = languages.split(',').map(lang => lang.trim());
        //     for (const languageName of languageNames) {
        //         await pool.query("INSERT INTO user_language (user_id, language_name) VALUES ($1, $2)", [userId, languageName]);
        //     }
        // }

        // To Handle Duplicate language entry
        async function handleLanguage(userId, languageName) {
            // First, check if the language already exists for the user
            const result = await pool.query(
                "SELECT 1 FROM user_language WHERE user_id = $1 AND language_name = $2",
                [userId, languageName]
            );
        
            // If no entry exists, insert the new language
            if (result.rows.length === 0) {
                await pool.query(
                    "INSERT INTO user_language (user_id, language_name) VALUES ($1, $2)",
                    [userId, languageName]
                );
                return { languageName, added: true };
            }
        
            // Return if already exists, no insertion
            return { languageName, added: false };
        }

        // CSV for the language parameter

        if (languages) {
            const languageNames = languages.split(',').map(lang => lang.trim());
            for (const languageName of languageNames) {
                const result = await handleLanguage(userId, languageName);
                console.log(`Handling ${languageName}: ${result.added ? 'Added' : 'Already exists'}`);
            }
        }
        
        
        res.status(200).json({ message: "User data updated successfully." });
    } catch (error) {
        console.error("Error updating user details:", error.message);
        res.status(500).json({ error: "Server Error", message: "An error occurred on the server." });
    }
})


module.exports = { router };