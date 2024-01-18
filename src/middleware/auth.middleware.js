const { JWT } = require('../config');

const authenticateUser = (req, res, next) => {
	const token = req.header('Authorization');

	if (!token) next({ status: 401, message: 'Unauthorized' });

	try {
		const decoded = JWT.verifyToken(token);
		req.user = decoded;
	} catch (error) {
		next({ status: 401, message: 'Invalid Token' });
	}
};

module.exports = { authenticateUser };
