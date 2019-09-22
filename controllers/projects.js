const express = require("express");

const router = express.Router();

const Project = require("../models/Project");

router.get("/", (req, res) => {
  Project.find({}).then((response, err) => {
    if (err) return err;

    res.send(response);
  });
});

router.post("/add", (req, res) => {
  let { title, description, imgUrl, projectLink, stuff } = req.body;

  let project = new Project({
    title,
    description,
    imgUrl,
    projectLink,
    stuff
  });

  project.save().then(() => {
    res.sendStatus(201);
  });
});

router.put("/edit/:id", (req, res) => {
  Project.findByIdAndUpdate(req.params.id, req.body).then(() => {
    res.sendStatus(200); // every thing is OK
  });
});

// delete a course
router.delete("/delete/:id", (req, res) => {
  Project.findByIdAndDelete(req.params.id).then(() => {
    res.sendStatus(204); // every thing is OK but a record is deleted
  });
});

module.exports = router;