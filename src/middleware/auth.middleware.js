const { UserModel } = require('../models');
const { UserRepository } = require('../repositories');
const { Prisma, JWT } = require('../config');
const userRepository = new UserRepository({ userModel: new UserModel({ prisma: Prisma }) });

const authenticateUser = async (req, res, next) => {
	const token = req.header('Authorization');

	// Check if Authorization token is sent
	if (!token) return next({ status: 401, message: 'Unauthorized' });

	try {
		// Decoding the JWT token
		const decoded = JWT.verifyToken(token);
		//  Finding the user assigned to the token
		const user = await userRepository.getById(decoded.userId);
		// Checking if the user exists or whether that user has logged in
		// If both conditions below are false, send an error
		if (!user || !user.login)
			return next({ status: 401, message: `Invalid token for the user ${user.username}` });
		next();
	} catch (error) {
		next({ status: 401, message: 'Invalid Token' });
	}
};

module.exports = { authenticateUser };
