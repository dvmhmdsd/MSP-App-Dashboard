const mongoose = require("mongoose");
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
  price: {
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
  imgURL: String,
  date: String,
  time: String
});

module.exports = Event = mongoose.model("Event", eventSchema);
