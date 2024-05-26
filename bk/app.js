const express = require("express");
const crypto = require("crypto");
const app = express();
const cors = require("cors");
const pool = require("../bk/db");

app.use(cors());
app.use(express.json());

// Function to generate random alphanumeric string
function generateRandomString(length) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = crypto.randomInt(0, charset.length);
        randomString += charset[randomIndex];
    }
    return randomString;
}

// POST API for creating users
app.post("/users", async (req, res) => {
    try {
        const { username, first_name, last_name, email_address, languages, occupation_code } = req.body;

        // Validate input fields here (e.g., check if required fields are provided)

        // Query the user_occupation table to retrieve the id based on the provided code
        const occupationResult = await pool.query(
            "SELECT id FROM user_occupation WHERE code = $1",
            [occupation_code]
        );

        // Check if occupation with provided code exists
        if (occupationResult.rows.length === 0) {
            return res.status(400).json({ error: "Invalid occupation code", message: "No occupation found with the provided code." });
        }

        const occupationId = occupationResult.rows[0].id;

        // Insert into users table with occupation_id
        const creationUrn = generateRandomString(35);
        const userResult = await pool.query(
            "INSERT INTO users (username, first_name, last_name, email_address, creation_urn, user_occupation_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
            [username, first_name, last_name, email_address, creationUrn, occupationId]
        );
        const userId = userResult.rows[0].id;

        // Insert into user_language table if languages are provided
        if (languages) {
            const languageNames = languages.split(',').map(lang => lang.trim());
            for (const languageName of languageNames) {
                await pool.query(
                    "INSERT INTO user_language (user_id, language_name) VALUES ($1, $2)",
                    [userId, languageName]
                );
            }
        }

        // Send JSON response with generated URN
        res.status(200).json({ urn: creationUrn, message: "User data received successfully." });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server Error", message: "An error occurred on the server." });
    }
});

app.listen(5001, () => {
    console.log("Server has started on port 5001");
});
