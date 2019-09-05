const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: String,
    link: String
})

let Course = mongoose.model('Course', courseSchema);

module.exports = Course;
