const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ticket: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    formLink: {
        type: String,
        required: true
    },
    topics: [
        {
            title: String,
            speakerName: String,
            speakerJob: String
        }
    ],
    image: String,
    date: {
        type: Date,
        required: true
    },
    // time:
})

module.exports = Course = mongoose.model('Course', eventSchema);
