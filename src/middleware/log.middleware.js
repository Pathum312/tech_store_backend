const { createLogger, format, transports } = require('winston');
const { timestamp, combine, printf, colorize } = format;

// Different formatting options for console and file
// Colorize messes up the logs sent to the file, so they are kept separated
const options = {
	console: {
		format: combine(
			colorize({ all: true }),
			timestamp({ format: 'DD-MM-YY HH:mm:ss' }),
			printf(log => `[${log.level}] - ${log.timestamp} - ${log.message}`),
		),
	},
	file: {
		filename: 'server.log',
		format: combine(
			timestamp({ format: 'DD-MM-YY HH:mm:ss' }),
			printf(log => `[${log.level}] - ${log.timestamp} - ${log.message}`),
		),
	},
};
// Custom Logger Setup
const logger = createLogger({
	transports: [
		new transports.Console(options.console),
		new transports.File(options.file),
	],
});

// Global Error Catcher
const handleErrors = (err, req, res, next) => {
	// Log error
	logger.error(
		`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
			req.method
		} - ${req.ip}`,
	);
	// Send error as response
	res.status(err.status || 500).json({ error: err.message });
};

module.exports = { handleErrors, logger };
