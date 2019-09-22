const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const bodyParser = require("body-parser");

const projectsController = require("./controllers/projects");
const coursesController = require("./controllers/courses");
const eventsController = require("./controllers/events");
const usersController = require("./controllers/users");

const config = require("./config/config");

const app = express();

// connect to mongo
mongoose.connect(config.DB, { useNewUrlParser: true });

const db = mongoose.connection;

// on connect
db.on("connected", () => {
  console.log("connected to db");
});

// on error
db.on("error", error => {
  console.log(error);
});

// set the cors
app.use(cors());

// body parser
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// set passport
app.use(passport.initialize());
app.use(passport.session());

// use controllers
app.use("/api/projects", projectsController);
app.use("/api/courses", coursesController);
app.use("/api/events", eventsController);
app.use("/api/users", usersController);

if (process.env.NODE_ENV === "production") {
  // assets
  app.use(express.static(path.join(__dirname, "public")));
  
  // always send the index.html file to handle SPA
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });
}

// listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
