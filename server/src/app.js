// app.js
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const organizationRoutes = require('./routes/organizationRoutes');
const authRoutes = require('./routes/authRoutes');  
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyParser.json());

connectDB();
app.get('/', (req, res) => {
    res.send('Welcome to the Organization API!');
});
// Use organization and authentication routes
app.use('/', organizationRoutes);
app.use('/', authRoutes);  

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
