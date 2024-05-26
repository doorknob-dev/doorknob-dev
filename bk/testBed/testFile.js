const express = require("express");
const http = require('http');
const socketIo = require('socket.io');
const cors = require("cors");
const pool = require("../db");
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Fetch messages from PostgreSQL and emit them through Socket.IO
const fetchMessagesAndEmit = async () => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM messages ORDER BY created_at DESC LIMIT 10');
        client.release();
        const messages = result.rows;
        io.emit('messages', messages);
        console.log('Messages fetched from database and emitted to clients:', messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
};

// Socket.IO connection handler
io.on('connection', (socket) => {
    console.log('A client connected');

    // Fetch messages when a new client connects
    fetchMessagesAndEmit();

    socket.on('disconnect', () => {
        console.log('A client disconnected');
    });

    socket.on('message', (message) => {
        console.log('Received message from client:', message);
        // Process the message as needed
    });
});

// Start the server
const PORT = process.env.PORT || 5003;
server.listen(PORT, () => {
    console.log(`WebSocket server running on port ${PORT}`);
});
