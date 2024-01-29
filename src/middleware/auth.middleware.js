const { JWT } = require('../config');
const { UserModel } = require('../models');
const { UserRepository } = require('../repositories');
const { Prisma } = require('../config');
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
		// Checking if that user exists
		if (!user) return next({ status: 401, message: 'User assigned for the token, does not exist' });
		next();
	} catch (error) {
		next({ status: 401, message: 'Invalid Token' });
	}
};

module.exports = { authenticateUser };
