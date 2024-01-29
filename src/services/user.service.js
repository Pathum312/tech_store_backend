const { logger } = require('../middleware/log.middleware');

class UserService {
	constructor({ userRepository }) {
		this.userRepository = userRepository;
	}

	async get(req, res, next) {
		try {
			const { username, name, email } = req.query;
			const users = await this.userRepository.get({ username, name, email });
			logger.info(`200 - Got User List - /users - GET - ${JSON.stringify(req.query)}}`);
			return res.status(200).json(users);
		} catch (error) {
			next(error);
		}
	}

	async getById(req, res, next) {
		try {
			const id = req.params.id;
			const user = await this.userRepository.getById(id);
			logger.info(`200 - Got User ${user.username} Info - /users/${id} - GET`);
			return res.status(200).json(user);
		} catch (error) {
			next(error);
		}
	}

	async update(req, res, next) {
		try {
			const { id, name, username, address } = req.body;
			// Check if the user exists before update
			const user = await this.userRepository.getById(id);
			if (!user)
				return next({
					status: 400,
					message: `User doesn't exist.`,
				});
			// If username is sent
			// Check if that username is available
			if (username && user.username.toLowerCase() === username.toLowerCase())
				return next({ status: 400, message: `${username} is not available.` });
			// Now update user with new details
			const updatedUser = await this.userRepository.update({
				id,
				name,
				username,
				address,
			});
			logger.info(`200 - Updated User ${updatedUser.username} - /users - PUT`);
			return res.status(200).json({ message: `User ${updatedUser.username} updated` });
		} catch (error) {
			next(error);
		}
	}

	async destroy(req, res, next) {
		try {
			const id = req.params.id;
			// Check if the user exists before deletion
			const user = await this.userRepository.getById(id);
			if (!user)
				return next({
					status: 400,
					message: `User doesn't exist.`,
				});
			// If user exists, delete user
			const deletedUser = await this.userRepository.destroy(id);
			logger.info(`200 - Deleted User ${deletedUser.username} - /users - DELETE`);
			return res.status(200).json({ message: `User ${deletedUser.username} deleted` });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = UserService;
