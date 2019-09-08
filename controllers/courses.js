const express = require("express");

const router = express.Router();

const Course = require("../models/Course");

// get all courses
router.get("/", (req, res) => {
  Course.find({}).then((response, err) => {
    if (err) return err;

    res.send(response);
  });
});

// add a course
router.post("/add", (req, res) => {
  // get the data from the body
  let { name, link } = req.body;

  // create a new instance of course model
  let course = new Course({
    name,
    link
  });

  // save this instance into db
  course.save().then(() => {
    res.sendStatus(201); // every thing is OK but new record created
  });
});

// edit the course
router.put("/edit/:id", (req, res) => {
  Course.findByIdAndUpdate(req.params.id, req.body).then(() => {
    res.sendStatus(200); // every thing is OK
  });
});

// delete a course
router.delete("/delete/:id", (req, res) => {
  Course.findByIdAndDelete(req.params.id).then(() => {
    res.sendStatus(204); // every thing is OK but a record is deleted
  });
});

module.exports = router;
