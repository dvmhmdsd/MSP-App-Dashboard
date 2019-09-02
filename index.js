const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const bodyParser = require('body-parser');

const config = require('./config/config');

const app = express();

// connect to mongo
mongoose.connect(config.DB, { useNewUrlParser: true });

const db = mongoose.connection;

// on connect
db.on('connected', () => {
    console.log('connected to db');
});

// on error
db.on('error', (error) => {
    console.log(error);
});

// assets
app.use(express.static(path.join(__dirname, 'public')));

// set the cors
app.use(cors())

// body parser
app.use(bodyParser.json());

// set passport
app.use(passport.initialize())
app.use(passport.session())

// always send the index.html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

// listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
})
