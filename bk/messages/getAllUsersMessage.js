const express = require('express');
const app = express(); // Create an Express application
const pool = require("../db");
const router = express.Router();
const cors = require("cors");
const { decryptMessage } = require('../utilities/encryption');
const authenticateToken = require('../utilities/authenticateUserToken')

app.use(cors());
app.use(express.json());

// const FETCH_QUERY = "SELECT u.id, u.profile_image_url, u.first_name, u.last_name, cm.receiver_user_id, cm.hashed_message FROM (SELECT m.*, u.username AS sender_username FROM messages m INNER JOIN users u ON m.sender_user_id = u.id WHERE m.receiver_user_id = $1 UNION SELECT m.*, u.username AS sender_username FROM messages m INNER JOIN users u ON m.receiver_user_id = u.id WHERE m.sender_user_id = $1) AS cm INNER JOIN users u ON cm.receiver_user_id = u.id ORDER BY cm.created_on DESC"

const FETCH_QUERY = "SELECT u.id, u.profile_image_url, u.first_name,u.last_name, m.receiver_user_id, m.hashed_message, m.created_on FROM messages m INNER JOIN ( SELECT receiver_user_id, MAX(created_on) AS max_created_on FROM messages WHERE sender_user_id = $1 GROUP BY receiver_user_id) m1 ON m1.receiver_user_id = m.receiver_user_id AND m1.max_created_on = m.created_on INNER JOIN users u ON u.id = m.receiver_user_id;"

// Define a GET route for fetching user details by ID
router.get('/details',authenticateToken, async (req, res) => {
    const id = parseInt(req.user.userId,10);
    try {
        const userResult = await pool.query(FETCH_QUERY, [id]);

        console.log("Query executed, rows found:", userResult.rows.length); // Logging the number of rows found

        if (userResult.rows.length > 0) {
            const decryptedMessages = userResult.rows.map(row => ({
                id: row.id,
                profile_image_url: row.profile_image_url,
                first_name: row.first_name,
                last_name: row.last_name,
                receiver_user_id: row.receiver_user_id,
                message: decryptMessage(row.hashed_message)
            }));

            console.log("Decrypted messages:", decryptedMessages);
            res.status(200).json(decryptedMessages); // Return all decrypted messages
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
