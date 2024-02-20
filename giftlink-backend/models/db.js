// db.js
const { MongoClient } = require('mongodb');

let dbInstance = null;

const username = encodeURIComponent(process.env.MONGO_USER);
const password = encodeURIComponent(process.env.MONGO_PASS);
const url = process.env.MONGO_URL;
const dbName = "giftdb";

const authSource = 'admin';

async function connectToDatabase() {
    if (dbInstance){
        return dbInstance
    };

    //Task 1: Connect to MongoDB
    const client = new MongoClient(url, {
        auth: {
            username: username,
            password: password
        },
        authSource: authSource,
        useUnifiedTopology: true
    });

    await client.connect();

    //Task 2: Assign dbInstance
    dbInstance = client.db(dbName);

    //Task 3: Return dbInstance
    return dbInstance;
}

module.exports = connectToDatabase;