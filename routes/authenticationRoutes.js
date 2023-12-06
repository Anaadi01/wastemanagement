const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { generateToken } = require('../authentication/jwtAuth');
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const saltRounds = 10; // 
// Sample user database (you should use a database in a real application)
const users = [];

// Register route
router.post('/register', async (req, res) => {
    const { firstName, lastName, mobileNumber, address, pincode, email, password, typeOfEmployee } = req.body;
    console.log(email)
    // Simple validation
    if (!mobileNumber && !email) {
        return res.status(400).json({ error: 'Mobile Number is required' });
    }

    try {
        // Check if the mobile number is already registered
        const existingUser = await User.findOne({
            $or: [{ mobileNumber }, { email }],
        });
        if (existingUser) {
            return res.status(400).json({ error: 'Mobile Number || Email is already registered' });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user with the hashed password
        const newUser = await User.create({
            firstName,
            lastName,
            mobileNumber,
            address,
            typeOfEmployee,
            pincode,
            email,
            password: hashedPassword,
        });

        // Create a JWT token with user information
        // const token = generateToken(newUser);

        // Respond with the token
        res.status(200).json({ data: newUser });
    } catch (error) {
        console.error('Registration failed:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateMobileNumber(mobileNumber) {
    // Assuming a simple validation for a 10-digit mobile number
    const mobileNumberRegex = /^\d{10}$/;
    return mobileNumberRegex.test(mobileNumber);
}


router.post('/login', async (req, res) => {
    const { mobileNumber, password } = req.body;
    let loginIdentifier = mobileNumber
    console.log(loginIdentifier)
    // Simple validation
    if (!loginIdentifier) {
        return res.status(400).json({ error: 'Mobile number or email is required' });
    }

    try {
        // Check if the login identifier is an email or a mobile number
        const isEmail = validateEmail(loginIdentifier);
        const isMobileNumber = validateMobileNumber(loginIdentifier);

        if (!isEmail && !isMobileNumber) {
            return res.status(400).json({ error: 'Invalid login identifier' });
        }

        // Determine the field to query based on the identifier type
        const userQueryField = isEmail ? { email: loginIdentifier } : { mobileNumber: loginIdentifier };

        // Check if the user with the provided identifier exists
        const user = await User.findOne(userQueryField);

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Create a JWT token with user information
        const token = generateToken(user);

        // Respond with the token
        res.json({ data: user, token: token, message: "Successfully Login" });
    } catch (error) {
        console.error('Login failed:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
