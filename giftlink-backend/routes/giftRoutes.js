const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');
const logger = require('../logger');

// Get all gifts
router.get('/', async (req, res, next) => {
    logger.info('/ called');
    try {
        //Task 1 Connect to MongoDB
        const db = await connectToDatabase();

        //Task 2 Access the collection
        const collection = db.collection("gifts");
        //Task 3 Fetch all gifts
        const gifts = await collection.find({}).toArray();
        //Task 4 Return gifts
        res.json(gifts);
    } catch (e) {
        logger.console.error('oops something went wrong', e)
        next(e);
    }
});

// Get a single gift by ID
router.get('/:id', async (req, res, next) => {
    try {
        // Task 1: Connect to MongoDB
        const db = await connectToDatabase();

        // Task 2: Access MongoDB collection
        const collection = db.collection("gifts");

        // Task 3: Fetch all gifts
        const id = req.params.id;
        const gift = await collection.findOne({ id: id });

        if (!gift) { 
            return res.status(404).send("Gift not found");
        }

    // Task 4: Return gifts
        res.json(gift);
    } catch (e) {
        next(e);
    }
});

module.exports = router;