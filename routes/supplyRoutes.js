const express = require('express');
const Supply = require('../models/materialSupplySchema.js');
const Inventory = require('../models/inventorySchema.js');
const User = require('../models/userSchema.js');
const router = express.Router();

// Sample user database (you should use a database in a real application)
const users = [];

// Register route
router.post('/createSupply', async (req, res) => {
    const { supplyDate, category, weight, address, area, pincode, userId } = req.body;
    console.log(supplyDate, category, weight, address, area, pincode)
    let user = await User.findById(userId)
    try {
        // Check if the mobile number is already registered

        const newCategory = await Supply.create({
            status: "Request Send",
            clientName: `${user.firstName} ${user.lastName}`,
            supplyDate, category, weight, address, area, pincode
        });

        // Create a JWT token with user information
        // const token = generateToken(newUser);

        // Respond with the token
        res.status(200).json({ data: newCategory, message: "Successfully Created Supply Request" });
    } catch (error) {
        console.error('Registration failed:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/getSupply', async (req, res) => {


    try {
        // Check if the mobile number is already registered
        console.log(req.body.userId)
        let user = await User.findById(req.body.userId)
        // Hash the password before storing it
        // Create a new user with the hashed password

        let getSupply = ""
        if (user.typeOfEmployee === 'Admin' || user.typeOfEmployee === 'Employee') {

            getSupply = await Supply.find();
        }
        else {
            getSupply = await Supply.find({
                clientName: `${user.firstName} ${user.lastName}`
            });

        }

        // Create a JWT token with user information
        // const token = generateToken(newUser);
        console.log(getSupply)
        // Respond with the token
        res.status(200).json({ data: getSupply, message: "Successfully Fetched" });
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
