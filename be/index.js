const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config()
const mongoose = require("mongoose");

const { Activity } = require("./models");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/activity', async (req, res) => {
    const { activityType, title } = req.body;
    const dateTime = req.body.dateTime;
    const duration = req.body.duration;
    const distance = req.body.distance;
    const description = req.body.description;

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
});

app.get("/api/activity", async (req, res) => {
    const allActivity = await Activity.find();
    return res.status(200).json({
        data: allActivity
    });
});

const start = async () => {
    try {
        const { DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env
        await mongoose.connect("mongodb+srv://"+DB_USERNAME+":"+DB_PASSWORD+"@"+DB_HOST+"/?retryWrites=true&w=majority");
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