const express = require('express');
const bodyParser = require('body-parser');
const firebaseAdmin = require('firebase-admin/app');
const { getAuth } = require("firebase-admin/auth");

require('dotenv').config()
const mongoose = require("mongoose");

const firebaseSecretConfig = require("./firebase-secret-config.json");

const { Activity } = require("./models");

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.cert(firebaseSecretConfig)
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

const appCheckVerification = async (req, res, next) => {
    const appAccessToken = req.header('x-access-token');
    if (!appAccessToken) {
        res.status(401);
        return next('Unauthorized');
    }
    try {
        const decoded = await getAuth()
            .verifyIdToken(appAccessToken)
            .then((decodedToken) => {
                console.log('decodedToken', decodedToken)
                return decodedToken;
            });
        console.log('decoded', decoded)
        req.header['x-user-id'] = decoded.user_id
        req.header['x-user-email'] = decoded.email
        return next();
    } catch (err) {
        console.log('err', err)
        res.status(401);
        return next('Unauthorized..');
    }
}

app.post('/api/activity',[appCheckVerification], async (req, res) => {
    
    const userId = req.header['x-user-id']; 
    const userEmail = req.header['x-user-email'];

    console.log('userId', userId);
    console.log('userEmail', userEmail)
    // Todo Add userId and email with activty

    const { activityType, title } = req.body;
    const dateTime = req.body.dateTime;
    const duration = req.body.duration;
    const distance = req.body.distance;
    const description = req.body.description;

    try {
        const newActivity = new Activity({
            activityType: activityType,
            title: title,
            dateTime: dateTime,
            duration: duration,
            distance: distance,
            description: description
        });
        const insertedActivity = await newActivity.save();
        console.log('insertedActivity: ', insertedActivity)
        return res.status(201).json(insertedActivity);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
});

app.get("/api/activity",[appCheckVerification], async (req, res) => {
    // Get user from header
    const userId = req.header['x-user-id']; 
    const userEmail = req.header['x-user-email'];

    console.log('userId', userId);
    console.log('userEmail', userEmail)
    // Todo get activity by userId 

    const allActivity = await Activity.find();
    return res.status(200).json({
        data: allActivity
    });
});

const start = async () => {
    try {
        const { DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env
        await mongoose.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/?retryWrites=true&w=majority`);
        const port = process.env.PORT || 8080;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}.`);
        });
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
};
  
start();