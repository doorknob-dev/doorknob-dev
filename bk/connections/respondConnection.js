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


// API to respond to connection

router.post("/respond_connection",authenticateToken,async(req,res) =>{
    try {
        const { initiated_user_id ,connectionStatus} = req.body;
        const receiver_user_id = req.user.userId;

        let connectionStatusID;
        if (connectionStatus === 'Y') {
            connectionStatusID = 2;
        } else if (connectionStatus === 'N') {
            connectionStatusID = 3;
        } else {
            return res.status(400).json({ message: "Invalid connection status" });
        }

        const updateConnection = await pool.query(
            "UPDATE connections SET connection_status_id = $1 WHERE initiated_user_id = $2 AND receiver_user_id = $3 RETURNING *", 
            [connectionStatusID, initiated_user_id, receiver_user_id]
        );

        if (updateConnection.rowCount > 0) {
            res.status(200).json({ message: "Connection responded successfully" });
        } else {
            res.status(404).json({ message: "Connection not found" });
        }


        res.status(200).json({message:"Connection responded successfully"});
    } catch (error) {
        console.error("Error updating user details:", error.message);
        res.status(500).json({ error: "Server Error", message: "An error occurred on the server." });
    }
});

module.exports = { router };

// app.use('/', router);


// app.listen(5001, () => {
//     console.log("Server started on port 5001");
//   });