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
    ticket,
    location,
    formLink,
    image,
    topics
  } = req.body;

  let event = new Event({
    title,
    description,
    ticket,
    location,
    formLink,
    image,
    topics
  });

  event.save().then(() => {
    res.sendStatus(201);
  });
});

module.exports = router;
