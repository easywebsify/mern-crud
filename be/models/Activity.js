const mongoose = require("mongoose"); // import mongoose

// Define schema
const ActivitySchema = new mongoose.Schema({
    activityType : {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    dateTime: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number,
        required: false,
    },
    distance: {
        type: Number,
        required: true,
    },
    description : {
        type: String,
        required: true,
    },
});

// Create model or collection
const Activity = mongoose.model("Activity", ActivitySchema);

// export collection
module.exports = { Activity };