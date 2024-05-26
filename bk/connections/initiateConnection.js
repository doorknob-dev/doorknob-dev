const express = require("express");
const crypto = require("crypto");
const app = express();
const cors = require("cors");
const pool = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authenticateToken = require("../utilities/authenticateUserToken");

app.use(cors());
app.use(express.json());


// API to initiate connection

router.post("/initiate_connection",authenticateToken,async (req,res) => {
    try {
        const {receiver_user_id} = req.body
        const {userId} = req.user

    console.log("recieved the receiver id:", req.body);
    console.log("initiatde user id:", req.user);
    
    const connection_status = await pool.query("select id from connection_status_lk where id = 1");
    const connectionStatusId = connection_status.rows[0].id;


    const initiateConnection = await pool.query("INSERT INTO connections (initiated_user_id, receiver_user_id, connection_status_id) values ($1,$2,$3) returning id", [userId,receiver_user_id,connectionStatusId]);

        res.status(200).json({message:"Connection request sent successfully"});
    } catch (error) {
        console.error("Error updating user details:", error.message);
        res.status(500).json({ error: "Server Error", message: "An error occurred on the server." });
    }
})

module.exports = { router };

// app.use('/', router);


// app.listen(5001, () => {
//     console.log("Server started on port 5001");
//   });