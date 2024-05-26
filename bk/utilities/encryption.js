const crypto = require('crypto');

// Define the encryption key and algorithm (make sure the key is kept secret and secure)
// This key should be a 32-byte Buffer for AES-256-CBC
const encryptionKey = crypto.createHash('sha256').update(String('7MMr8RAwQULjdXFOqb3tXcNzAi1FD2sz')).digest('base64').substr(0, 32); // Ensure the key is 32 bytes
const algorithm = 'aes-256-cbc';

// Function to encrypt a message
const encryptMessage = (message) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(encryptionKey), iv);
  let encrypted = cipher.update(message, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
};

// Function to decrypt a message
const decryptMessage = (encryptedMessage) => {
  const textParts = encryptedMessage.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(encryptionKey), iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

module.exports = { encryptMessage, decryptMessage };
