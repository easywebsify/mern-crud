const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config()
const mongoose = require("mongoose");

const { Activity } = require("./models");
const { Member } = require("./models");

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

app.post('/api/activity', async (req, res) => {
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

app.post('/api/member', async (req, res) => {
    const {username , email , password} = req.body
    try {
        const newMember = new Member({
            username,
            email,
            password
        });
        const insertedMember = await newMember.save();
        console.log('insertedMember: ', insertedMember);
        return res.status(201).json(insertedMember);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
});

app.get("/api/activity", async (req, res) => {
    const data = await Activity.find();
    return res.status(200).json({
        data
    });
});

app.get("/api/member", async (req, res) => {
    const dataMember = await Member.find();
    return res.status(200).json({
        dataMember
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