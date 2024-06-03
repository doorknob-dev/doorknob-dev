const socketIo = require("socket.io");
const jwt = require("jsonwebtoken");
const pool = require("../db");
const { decryptMessage } = require('../utilities/encryption');

const FETCH_QUERY = 'SELECT * FROM messages WHERE (sender_user_id = $1 AND receiver_user_id = $2) OR (sender_user_id = $2 AND receiver_user_id = $1) ORDER BY created_at DESC LIMIT 10';

const authenticateSocketToken = (socket, next) => {
  if (socket.handshake.query && socket.handshake.query.token) {
    jwt.verify(socket.handshake.query.token, '9u23r32f3f9398fj39jfu3', (err, decoded) => {
      if (err) {
        console.error('Socket authentication error:', err);
        return next(new Error('Authentication error'));
      }
      socket.userId = decoded.userId;
      next();
    });
  } else {
    console.error('Missing JWT token in socket connection');
    next(new Error('Authentication error'));
  }
};

const initializeWebSocket = (server) => {
  const io = socketIo(server);

  io.use(authenticateSocketToken);

  io.on('connection', (socket) => {
    console.log('A client connected');

    socket.on('join-user', (userId) => {
      socket.join(userId);
    });

    socket.on('fetchMessages', async ({ senderUserId, receiverUserId }) => {
      try {
        const result = await pool.query(FETCH_QUERY, [senderUserId, receiverUserId]);
        const messages = result.rows.map(row => ({
          _id: row.id,
          text: decryptMessage(row.message), // Assuming 'hashed_message' should be 'message'
          createdAt: new Date(row.created_at),
          user: {
            _id: row.sender_user_id,
            name: row.sender_user_id, // Adjust as needed if user name is different
          },
        }));
        socket.emit('messages', messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};

module.exports = { initializeWebSocket };
