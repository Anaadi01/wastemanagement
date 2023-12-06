const jwt = require('jsonwebtoken');

// Your secret key, replace it with a secure secret key
const secretKey = 'harshitSuman@2001';

// Function to generate a JWT token for a user
module.exports.generateToken = (user) => {
    const token = jwt.sign({ mobileNumer: user.mobileNumer }, secretKey);
    return token;
};

