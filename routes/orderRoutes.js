const express = require('express');
const Supply = require('../models/materialSupplySchema.js');
const Inventory = require('../models/inventorySchema.js');
const Order = require('../models/materialOrderSchema.js');
const router = express.Router();

// Sample user database (you should use a database in a real application)
const users = [];

// Register route
router.post('/createOrder', async (req, res) => {
    const { orderDate, category, weight, address, pincode } = req.body;

    try {
        // Check if the mobile number is already registered

        const newOrder = await Order.create({ status: "Order Place", orderDate, category, weight, address, pincode });

        // Create a JWT token with user information
        // const token = generateToken(newUser);

        // Respond with the token
        res.status(200).json({ data: newOrder, message: "Successfully Created Order Request" });
    } catch (error) {
        console.error('Registration failed:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/getOrder', async (req, res) => {


    try {
        // Check if the mobile number is already registered


        // Hash the password before storing it
        // Create a new user with the hashed password
        const getOrder = await Order.find();

        // Create a JWT token with user information
        // const token = generateToken(newUser);
        console.log(getOrder)
        // Respond with the token
        res.status(200).json({ data: getOrder, message: "Successfully Fetched" });
    } catch (error) {
        console.error('Registration failed:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/changeOrderStatusAdmin', async (req, res) => {


    try {
        // Check if the mobile number is already registered


        // Hash the password before storing it
        // Create a new user with the hashed password
        const getOrder = await Order.findByIdAndUpdate(req.body.orderId,
            {
                $set: { status: req.body.status }
            }, { upsert: true, new: true });

        // Create a JWT token with user information
        // const token = generateToken(newUser);
        console.log(getOrder)
        // Respond with the token
        res.status(200).json({ data: getOrder, message: `Successfully Status Changed To ${getOrder.status}` });
    } catch (error) {
        console.error('Registration failed:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
router.post('/orderPickedUpStatus', async (req, res) => {


    try {
        // Check if the mobile number is already registered


        // Hash the password before storing it
        // Create a new user with the hashed password
        const getSupply = await Order.findByIdAndUpdate(req.body.orderId,
            {
                $set: {
                    pickedUpDate: req.body.pickedUpDate,
                    pickedUpPlace: req.body.pickedUpPlace,
                    status: "Picked Up"
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
router.post('/orderDeliveryStatus', async (req, res) => {
    console.log(req.body)

    try {
        // Check if the mobile number is already registered


        // Hash the password before storing it
        // Create a new user with the hashed password
        const getSupply = await Order.findByIdAndUpdate(req.body.orderId,
            {
                $set: {
                    delieveredDate: req.body.delieveredDate,
                    delieveredPlace: req.body.delieveredPlace,
                    status: "Delivered"
                }
            }, { upsert: true, new: true });
        let addInventory = await Inventory.findOneAndUpdate({ categoryName: getSupply.category }, {
            $inc: { weight: -getSupply.weight }
        }, { upsert: true, new: true })

        // Create a JWT token with user information
        // const token = generateToken(newUser);
        console.log(getSupply)
        // Respond with the token
        res.status(200).json({ data: getSupply, message: `Successfully Delivered At Address` });
    } catch (error) {
        console.error('Registration failed:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;
