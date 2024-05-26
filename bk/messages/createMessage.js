const express = require("express");
const cors = require("cors");
const pool = require("../db");
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); // Ensure crypto is imported
const router = express.Router();
const app = express();
const { encryptMessage } = require('../utilities/encryption'); // Adjust the path if necessary


app.use(cors());
app.use(express.json());

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (!bearerHeader) {
      return res.status(401).json({ message: "No token provided" });
  }
  const bearerToken = bearerHeader.split(' ')[1];
  jwt.verify(bearerToken, '9u23r32f3f9398fj39jfu3', (err, decoded) => {
      if (err) {
          return res.status(401).json({ message: "Invalid token" });
      }
      if (!decoded || !decoded.userId) {
          return res.status(401).json({ message: "Invalid token: User ID missing" });
      }
      req.user = decoded; // Ensure this line is correctly executing
      next();
  });
};

  // POST API for adding posts 

router.post("/send",verifyToken, async (req,res) => {
    try {
        const {receiver_user_id, message} = req.body;
        const { userId } = req.user;

        console.log("Received login request:", req.body);
        console.log("Received login request:", req.user);

        const encryptedMessage = encryptMessage(message);

        const newMessage = await pool.query("INSERT INTO messages (sender_user_id,receiver_user_id,hashed_message) values ($1,$2,$3) returning *",[userId,receiver_user_id,encryptedMessage]);
        
        res.status(201).json({ id: newMessage.rows[0].id, message: message,api_message: 'Message sent successfully' });

    } catch (error) {
      console.error("Error during login:", error.message);
        res.status(500).json({ error: 'Server Error', message: 'An error occurred while sending a message' });
 
    }
});


  module.exports = { router };