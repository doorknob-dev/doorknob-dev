// const http = require("http");
const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const {initializeWebSocket} = require('../bk/messages/getDirectMessage'); // Adjust the path if needed
const registration = require("../bk/authentication/registration");
// const router = express.Router();
const login = require("../bk/authentication/login");
const posts = require("../bk/post/createPost");
const userDetails = require("../bk/user_details/updateUserDetails");
const userDescription = require("../bk/user_details/updateUserDescription");
const verifyToken = require("../bk/user_details/verifyUserToken");
const initiateConnection = require("../bk/connections/initiateConnection");
const respondConnection = require("../bk/connections/respondConnection");
const createListing = require("../bk/listings/createListings");
const getUserBasicDetails = require("../bk/user_details/getUserProfile");
const getUserLanguageDetails = require("../bk/user_details/getUserLanguage");
const getPostsDetails = require("../bk/post/getPosts");
const getListingsDetails = require("../bk/listings/getListings");
const createDirectMessage = require("../bk/messages/createMessage");
const getAllUserMessage = require("../bk/messages/getAllUsersMessage");

app.use(cors());
app.use(express.json());
const server = http.createServer(app);


app.use("/registration", registration.router);
app.use("/login", login.router);
app.use("/posts", posts.router);
app.use("/user_details", userDetails.router);
app.use("/user_description", userDescription.router);
app.use("/verify_user", verifyToken.router);
app.use("/connection",initiateConnection.router);
app.use("/connection",respondConnection.router);
app.use("/listings/add", createListing.router);
app.use("/user_details",getUserBasicDetails.router);
app.use("/user_details",getUserLanguageDetails.router);
app.use("/posts",getPostsDetails.router);
app.use("/listings",getListingsDetails.router)
app.use("/messages",createDirectMessage.router)
app.use("/messages",getAllUserMessage.router)

initializeWebSocket(server);


app.listen(5001, () => {
    console.log("Server started on port 5001");
  });


