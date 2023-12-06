const express = require('express');
const mongoose = require('mongoose');
const authenticationRoutes = require('./routes/authenticationRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const supplyRoutes = require('./routes/supplyRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const app = express();
const PORT = 3000;
const cors = require('cors');
const dotenv = require('dotenv'); // Import dotenv
const path = require('path'); // Import the 'path' module

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB using the environment variable
mongoose.connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use(express.json());
app.use(cors());
// app.use(cors());
app.use('/api', authenticationRoutes);
app.use('/api', categoryRoutes);
app.use('/api', supplyRoutes);
app.use('/api', inventoryRoutes);
app.use('/api', orderRoutes);

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
