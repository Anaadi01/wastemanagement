const express = require('express');
const Category = require('../models/categorySchema');
const router = express.Router();

// Sample user database (you should use a database in a real application)
const users = [];

// Register route
router.post('/addCategory', async (req, res) => {
    const { categoryName } = req.body;
    // Simple validation
    console.log(categoryName)

    try {
        // Check if the mobile number is already registered
        const existingCategory = await Category.findOne({ categoryName });
        if (existingCategory) {
            return res.status(400).json({ error: 'Category already registered' });
        }

        // Hash the password before storing it
        // Create a new user with the hashed password
        const newCategory = await Category.create({ categoryName });

        // Create a JWT token with user information
        // const token = generateToken(newUser);

        // Respond with the token
        res.status(200).json({ data: newCategory, message: "Successfully Added" });
    } catch (error) {
        console.error('Registration failed:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/getAllCategory', async (req, res) => {


    try {
        // Check if the mobile number is already registered


        // Hash the password before storing it
        // Create a new user with the hashed password
        const getCategories = await Category.find();

        // Create a JWT token with user information
        // const token = generateToken(newUser);

        // Respond with the token
        res.status(200).json({ data: getCategories, message: "Successfully Fetched" });
    } catch (error) {
        console.error('Registration failed:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.delete('/deleteCategory', async (req, res) => {


    try {
        // Check if the mobile number is already registered


        // Hash the password before storing it
        // Create a new user with the hashed password
        const deletedCategory = await Category.deleteOne({ _id: req.body.categoryId });

        // Create a JWT token with user information
        // const token = generateToken(newUser);

        // Respond with the token
        res.status(200).json({ message: "Successfully Deleted" });
    } catch (error) {
        console.error('Registration failed:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
