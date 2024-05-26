const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("../db");
const jwt = require("jsonwebtoken");
const router = express.Router();

app.use(cors());
app.use(express.json());

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ error: "Unauthorized", message: "Token not provided" });
    }
  
    jwt.verify(token.split(" ")[1], '9u23r32f3f9398fj39jfu3', (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized", message: "Invalid token" });
      }
      console.log("Decoded token:", decoded);
      req.user = decoded;
      next();
    });
  };
  
  app.use(verifyToken);
  // POST API for adding posts 

router.post("/posts", async (req,res) => {
    try {
        const {post_title, post_description} = req.body;
        const { userId } = req.user;

        console.log("Received login request:", req.body);
        console.log("Received login request:", req.user);

        const userCreationUrn = await pool.query("SELECT creation_urn FROM users where id = $1",[userId]);
        const creationUrnValue = userCreationUrn.rows[0].creation_urn;
        const postResult = await pool.query("INSERT INTO posts (post_title,post_description,user_id,user_creation_urn) values ($1,$2,$3,$4) returning *",[post_title,post_description,userId,creationUrnValue]);

        res.status(200).json({ message: 'post added successfully' });

        console.log("Database query result:", postResult.rows);

    } catch (error) {
      console.error("Error during login:", error.message);
        res.status(500).json({ error: 'Server Error', message: 'An error occurred while creating the post' });
 
    }
});

app.listen(5001, () => {
  console.log("Server is listening on port 5001");
});

  // module.exports = { router };