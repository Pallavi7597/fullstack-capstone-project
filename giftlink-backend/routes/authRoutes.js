//Import necessary package
const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectToDatabase = require('../models/db');
const router = express.Router();
const dotenv = require('dotenv');
const pino = require('pino');  // Import Pino logger
dotenv.config();

const logger = pino();  // Create a Pino logger instance

//Create JWT secret
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
    try {
      //Connect to `giftsdb` in MongoDB through `connectToDatabase` in `db.js`.
      const db = await connectToDatabase();

      //Access the collection
      const collection = db.collection("users");

      //Check for existing email in DB
      const existingEmail = await collection.findOne({ email: req.body.email });

        if (existingEmail) {
            logger.error('Email id already exists');
            return res.status(400).json({ error: 'Email id already exists' });
        }

        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(req.body.password, salt);
        const email=req.body.email;
        console.log('email is',email);

        //Save user details
        const newUser = await collection.insertOne({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hash,
            createdAt: new Date(),
        });

        //Create JWT
        const payload = {
        user: {
        id: newUser.insertedId,
        },
        };
        jwt.sign(payload, JWT_SECRET)

        const authtoken = jwt.sign(payload, JWT_SECRET);
        logger.info('User registered successfully');
        res.json({ authtoken,email });
    } catch (e) {
        logger.error(e);
        return res.status(500).send('Internal server error');
    }
});

module.exports = router;
