const express = require('express');
const Supply = require('../models/materialSupplySchema.js');
const Inventory = require('../models/inventorySchema.js');
const router = express.Router();

// Sample user database (you should use a database in a real application)
const users = [];

// Register route

router.get('/getInventory', async (req, res) => {


    try {
        // Check if the mobile number is already registered


        // Hash the password before storing it
        // Create a new user with the hashed password
        const getInventory = await Inventory.find();

        // Create a JWT token with user information
        // const token = generateToken(newUser);
        // console.log(getSupply)
        // Respond with the token
        res.status(200).json({ data: getInventory, message: "Successfully Fetched" });
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
router.post('/changeStatusAdmin', async (req, res) => {


    try {
        // Check if the mobile number is already registered


        // Hash the password before storing it
        // Create a new user with the hashed password
        const getSupply = await Supply.findByIdAndUpdate(req.body.supplyId,
            {
                $set: { status: req.body.status }
            }, { upsert: true, new: true });

        // Create a JWT token with user information
        // const token = generateToken(newUser);
        console.log(getSupply)
        // Respond with the token
        res.status(200).json({ data: getSupply, message: `Successfully Status Changed To ${getSupply.status}` });
    } catch (error) {
        console.error('Registration failed:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
router.post('/pickedUpStatus', async (req, res) => {


    try {
        // Check if the mobile number is already registered


        // Hash the password before storing it
        // Create a new user with the hashed password
        const getSupply = await Supply.findByIdAndUpdate(req.body.supplyId,
            {
                $set: {
                    pickedUpDate: req.body.pickedUpDate,
                    pickedUpPlace: req.body.pickedUpPlace
                }
            }, { upsert: true, new: true });

        // Create a JWT token with user information
        // const token = generateToken(newUser);
        console.log(getSupply)
        // Respond with the token
        res.status(200).json({ data: getSupply, message: `Successfully Status Changed To ${getSupply.status}` });
    } catch (error) {
        console.error('Registration failed:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
router.post('/dropDownStatus', async (req, res) => {
    console.log(req.body)

    try {
        // Check if the mobile number is already registered


        // Hash the password before storing it
        // Create a new user with the hashed password
        const getSupply = await Supply.findByIdAndUpdate(req.body.supplyId,
            {
                $set: {
                    dropDownDate: req.body.dropDownDate,
                    dropDownPlace: req.body.dropDownPlace,
                    status: "Completed"
                }
            }, { upsert: true, new: true });
        let addInventory = await Inventory.findOneAndUpdate({ categoryName: getSupply.category }, {
            $inc: { weight: getSupply.weight }
        }, { upsert: true, new: true })

        // Create a JWT token with user information
        // const token = generateToken(newUser);
        console.log(getSupply)
        // Respond with the token
        res.status(200).json({ data: getSupply, message: `Successfully Dropped Down At Center` });
    } catch (error) {
        console.error('Registration failed:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;
