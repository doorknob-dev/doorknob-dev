const crypto = require('crypto');

// Function to generate random alphanumeric string
function generateRandomString(length) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = crypto.randomInt(0, charset.length);
        randomString += charset[randomIndex];
    }
    return randomString;
}

// Export the generateRandomString function
module.exports = generateRandomString;
