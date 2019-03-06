const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

//DB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/bapi', { useNewUrlParser: true });

//MiddleWare
const app = express();
app.use(cors());

if (!process.env.NODE_ENV === 'test') {
  app.use(morgan('dev'));
}
app.use(bodyParser.json());

//Routes
app.use('/users', require('./routes/users'));
app.use('/groups', require('./routes/groups'));

module.exports = app;