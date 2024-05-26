const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("../db");
const jwt = require("jsonwebtoken");
const router = express.Router();

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

router.post("/",verifyToken, async (req,res) => {
    try {
        const {post_title, post_description} = req.body;
        const { userId } = req.user;

        console.log("Received login request:", req.body);
        console.log("Received login request:", req.user);

        const userCreationUrn = await pool.query("SELECT creation_urn FROM users where id = $1",[userId]);

        const creationUrnValue = userCreationUrn.rows[0].creation_urn;

        console.log("urn:", userCreationUrn);
        const postResult = await pool.query("INSERT INTO posts (post_title,post_description,user_id,user_creation_urn) values ($1,$2,$3,$4) returning *",[post_title,post_description,userId,creationUrnValue]);
        res.status(200).json({ message: 'post added successfully' });

    } catch (error) {
      console.error("Error during login:", error.message);
        res.status(500).json({ error: 'Server Error', message: 'An error occurred while creating the post' });
 
    }
});


  module.exports = { router };