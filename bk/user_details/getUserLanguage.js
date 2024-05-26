const express = require('express');
const app = express(); // Create an Express application
const pool = require("../db");
const router = express.Router();
const cors = require("cors");
const authenticateToken  = require("../utilities/authenticateUserToken");

// Middleware

app.use(cors());
app.use(express.json());

const FETCH_QUERY = "select ul.language_name from user_language ul where ul.user_id = $1"

// Define a GET route for fetching user details by ID
router.get('/languages', authenticateToken,async (req, res) => {
    // const id = parseInt(req.params.id, 10);
    const id = parseInt(req.user.userId,10);
    try {
        const userResult = await pool.query(FETCH_QUERY, [id]); // Changed SELECT id to SELECT * to fetch all user details

        console.log("Query executed, rows found:", userResult.rows.length); // Logging the number of rows found

        if (userResult.rows.length > 0) {
            console.log("User found:", userResult.rows); // Logging found user details
            const languages = userResult.rows.map(row => row.language_name); // Extracting the user ID from the result
            res.status(200).json({userId: id, languages: languages }); // Returning the found user details
        } else {
            console.log("User not found for ID:", id); // Logging not found status
            res.status(404).json({ message: "User not found" }); // Correctly returning 404 when no user is found
        }
    } catch (error) {
        console.error("Error during query:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = { router };