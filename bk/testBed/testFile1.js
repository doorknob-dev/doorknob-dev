const { encryptMessage, decryptMessage } = require('../utilities/encryption');

// Test the encryptMessage function
const message = 'Hello, world!';
const encryptedMessage = encryptMessage(message);
console.log(`Encrypted message: ${encryptedMessage}`);

// Test the decryptMessage function
const decryptedMessage = decryptMessage(encryptedMessage);
console.log(`Decrypted message: ${decryptedMessage}`);