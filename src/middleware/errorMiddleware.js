const { logger } = require('../app');

function handleErrors(err, req, res, next) {
	// Log error
	logger.error(
		`${err.status || 500} - 
		${err.message} - 
		${req.originalUrl} - 
        ${req.method} - 
		${req.ip}`,
	);
	// Send error as response
	res.status(err.status || 500).json({ error: err.message });
}

module.exports = { handleErrors };
