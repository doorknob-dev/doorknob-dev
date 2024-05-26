const express = require('express');
const app = express(); // Create an Express application
const pool = require("../db");
const router = express.Router();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const FETCH_QUERY = "select u.first_name as first_name,u.last_name as last_name,u.profile_image_url as profile_url,ulc.name as job_title, u.user_description as about_me from users u inner join user_occupation ulc on u.user_occupation_id = ulc.id where u.id = $1"

// Define a GET route for fetching user details by ID
router.get('/basic/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10); // Convert the id to an integer
    try {
        const userResult = await pool.query(FETCH_QUERY, [id]); // Changed SELECT id to SELECT * to fetch all user details

        console.log("Query executed, rows found:", userResult.rows.length); // Logging the number of rows found

        if (userResult.rows.length > 0) {
            console.log("User found:", userResult.rows[0]); // Logging found user details
            res.status(200).json(userResult.rows[0]); // Returning the found user details
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