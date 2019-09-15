const express = require("express");

const router = express.Router();

const Event = require("../models/Event");

router.get("/", (req, res) => {
  Event.find({}).then((response, err) => {
    if (err) return err;

    res.send(response);
  });
});

router.post("/add", (req, res) => {
  let {
    title,
    description,
    price,
    location,
    formLink,
    imgURL,
    date,
    time,
    topics
  } = req.body;

  let event = new Event({
    title,
    description,
    price,
    location,
    formLink,
    imgURL,
    date,
    time,
    topics
  });

  event.save().then(() => {
    res.sendStatus(201);
  });
});

router.put("/edit/:id", (req, res) => {
  Event.findByIdAndUpdate(req.params.id, req.body).then(() => {
    res.sendStatus(200); // every thing is OK
  });
});

// delete a course
router.delete("/delete/:id", (req, res) => {
  Event.findByIdAndDelete(req.params.id).then(() => {
    res.sendStatus(204); // every thing is OK but a record is deleted
  });
});

module.exports = router;
