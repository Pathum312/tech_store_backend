const express = require('express');
const morgan = require('morgan');
const winston = require('winston');
const cors = require('cors');
const expressWinston = require('express-winston');
const { handleErrors } = require('./middleware/errorMiddleware');
const userController = require('./controllers/user.controller');
const app = express();

// Custom Logger Setup
const logger = winston.createLogger({
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: 'combined.log' }),
	],
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.simple(),
	),
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));
// Error log Setup
app.use(
	expressWinston.errorLogger({
		transports: [
			new winston.transports.Console(),
			new winston.transports.File({ filename: 'error.log' }),
		],
		format: winston.format.combine(
			winston.format.timestamp(),
			winston.format.json(),
		),
	}),
);
app.use(handleErrors); // Custom error logger
// API Routes
app.use('/user', userController);

module.exports = {
	app,
	logger,
};
