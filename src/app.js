const express = require('express');
const cors = require('cors');
const { handleErrors } = require('./middleware/log.middleware');
const { UserController } = require('./controllers');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// API Routes
app.use('/users', UserController);
// Custom error logger
app.use(handleErrors);

module.exports = app;
