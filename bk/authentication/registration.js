const express = require("express");
const crypto = require("crypto");
const app = express();
const cors = require("cors");
const pool = require("../db");
const generateRandomString = require("../utilities/urnGeneration")
const router = express.Router();

app.use(cors());
app.use(express.json());



// API to add username and password 

router.post("/", async (req, res) => {
    try {
        const { username, email_address, password } = req.body;

        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');


        const creationUrn = generateRandomString(35);

        const registerUser = await pool.query(
            "INSERT INTO users (username, email_address, creation_urn, hashed_password) VALUES ($1, $2, $3, $4) RETURNING id",
            [username, email_address, creationUrn, hashedPassword]
        );

        if (registerUser.rowCount === 1) {
            res.status(200).json({ urn: creationUrn, message: "User registered successfully." });
        } else {
            // If the insertion failed, handle the error
            throw new Error("Failed to register user.");
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server Error", message: "An error occurred on the server." });
    }
});



module.exports = { router };