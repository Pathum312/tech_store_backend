const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./env');

// Create an access token
generateToken = payload => {
	return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

// Verify generated token
verifyToken = token => {
	return jwt.verify(token, JWT_SECRET);
};

module.exports = {
	generateToken,
	verifyToken,
};
