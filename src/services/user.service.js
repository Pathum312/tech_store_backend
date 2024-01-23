const { logger } = require('../middleware/log.middleware');

class UserService {
	constructor({ userRepository }) {
		this.userRepository = userRepository;
	}

	async get(req, res, next) {
		try {
			const { username, name, email } = req.query;
			const users = await this.userRepository.get({ username, name, email });
			logger.info(
				`200 - Got User List - /users - GET - ${JSON.stringify(req.query)}}`,
			);
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
}

module.exports = UserService;
