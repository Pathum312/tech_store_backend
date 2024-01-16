const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./env');

// Create an access token
function generateToken(payload) {
	return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

// Verify generated token
function verifyToken(token) {
	return jwt.verify(token, JWT_SECRET);
}

module.exports = {
	generateToken,
	verifyToken,
};
