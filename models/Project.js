const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: String,
    description: String,
    imgURL: String,
    projectLink: String,
    stuff: [{
        name: String,
        memberIMG: String
    }],
    category: String
});

module.exports = Project = mongoose.model("Project", projectSchema);
