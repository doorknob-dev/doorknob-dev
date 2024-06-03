const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { disconnect } = require('node:process');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log('a user connected');

    setTimeout(() => {
        socket.send('this is a message from server')
    }, 4000);

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});



server.listen(5003, () => {
    console.log('server running at http://localhost:5003');
});