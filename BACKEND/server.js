const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('../BACKEND/config/db');
const router = require('../BACKEND/routes/AuthRoutes');
const dashboard = require('../BACKEND/routes/dashboardRoutes');

dotenv.config();
const app = express();
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(require('cors')());


app.use(express.json());

app.use('/',router);
app.use('/dashboard',dashboard);

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`the server is running on ${PORT}`);
});

