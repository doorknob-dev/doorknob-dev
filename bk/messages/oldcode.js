const socketIo = require("socket.io");
const jwt = require("jsonwebtoken");
const pool = require("../db");
const { decryptMessage, encryptMessage } = require('../utilities/encryption');

const FETCH_QUERY = 'SELECT * FROM messages WHERE (sender_user_id = $1 AND receiver_user_id = $2) OR (sender_user_id = $2 AND receiver_user_id = $1) ORDER BY created_at DESC LIMIT 10';

const authenticateSocketToken = (socket, next) => {
  if (socket.handshake.query && socket.handshake.query.token) {
    jwt.verify(socket.handshake.query.token, 'your_jwt_secret', (err, decoded) => {
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

    socket.on('get-messages', async ({ senderUserId, receiverUserId }) => {
      try {
        const client = await pool.connect();
        const result = await client.query(FETCH_QUERY, [senderUserId, receiverUserId]);
        const messages = result.rows.map(row => ({
          _id: row.id,
          text: decryptMessage(row.hashed_message),
          createdAt: row.created_at,
          user: {
            _id: senderUserId === row.sender_user_id ? senderUserId : receiverUserId,
          },
        }));
        socket.emit('messages', messages);
        client.release();
      } catch (error) {
        console.error('Error fetching messages:', error);
        socket.emit('error', 'Error fetching messages');
      }
    });

    socket.on('disconnect', () => {
      console.log('A client disconnected');
    });

    socket.on('message', async (message) => {
      console.log('Received message:', message);
      try {
        const newMessage = {
          sender_user_id: message.sender_user_id,
          receiver_user_id: message.receiver_user_id,
          hashed_message: encryptMessage(message.text), // Encrypt this if necessary
          created_at: new Date(), // Current timestamp
        };

        // Save message to the database
        const client = await pool.connect();
        const result = await client.query(
          'INSERT INTO messages (sender_user_id, receiver_user_id, hashed_message, created_at) VALUES ($1, $2, $3, $4) RETURNING id',
          [newMessage.sender_user_id, newMessage.receiver_user_id, newMessage.hashed_message, newMessage.created_at]
        );
        const messageId = result.rows[0].id;
        client.release();

        // Broadcast the message to the receiver's room
        io.to(newMessage.receiver_user_id).emit('new-message', {
          _id: messageId,
          text: message.text,
          createdAt: newMessage.created_at,
          user: { _id: newMessage.sender_user_id },
        });
      } catch (error) {
        console.error('Error handling message:', error);
      }
    });
  });

  return io;
};

module.exports = { initializeWebSocket };
