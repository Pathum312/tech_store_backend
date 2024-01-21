const express = require('express');
const cors = require('cors');
const { handleErrors } = require('./middleware/log.middleware');
const { authenticateUser } = require('./middleware/auth.middleware');
const { UserController, AuthController } = require('./controllers');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// API Routes
app.use('/auth', AuthController);
app.use('/users', authenticateUser, UserController);
// Custom error logger
app.use(handleErrors);

module.exports = app;
