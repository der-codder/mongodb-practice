const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./routes/routes');

mongoose.connect('mongodb://localhost/muber');

const app = express();
app.use(bodyParser.json());
routes(app);

module.exports = app;
