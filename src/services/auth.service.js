const { logger } = require('../middleware/log.middleware');

class AuthService {
	constructor({ userRepository, bcrypt, jwt }) {
		this.userRepository = userRepository;
		this.bcrypt = bcrypt;
		this.jwt = jwt;
	}

	async register(req, res, next) {
		try {
			const { name, username, address, role, email, password } = req.body;
			const existingUser = await this.userRepository.getByEmail(email);
			if (existingUser)
				return next({
					status: 400,
					message: `A user with the email: ${email}, already exists.`,
				});

			const hash = await this.bcrypt.hash(password, 10);
			let data = { name, username, role, email, password: hash };
			if (role === 'CLIENT') data['address'] = address;
			const newUser = await this.userRepository.create(data);
			logger.info(
				`201 - Added User ${username} - /auth/register - POST - ${JSON.stringify(req.body)}`,
			);
			return res.status(201).json(newUser);
		} catch (error) {
			next(error);
		}
	}

	async login(req, res, next) {
		try {
			const { email, password } = req.body;
			const user = await this.userRepository.getByEmail(email);
			const passwordIsCorrect = await this.bcrypt.compare(password, user.password);
			if (!user || !passwordIsCorrect)
				return next({ status: 400, message: 'Invalid email or password.' });

			const token = this.jwt.generateToken({ userId: user.id });
			logger.info(
				`200 - User ${user.username} Logged In - /auth/login - POST - ${JSON.stringify(req.body)}`,
			);
			return res.status(200).json({ ...user, token });
		} catch (error) {
			next(error);
		}
	}

	async resetPassword(req, res, next) {
		try {
			const { id, password, newPassword } = req.body;
			const user = await this.userRepository.getById(id);
			const passwordIsCorrect = await this.bcrypt.compare(password, user.password);
			if (!user || !passwordIsCorrect)
				return next({ status: 400, message: 'Invalid user or password' });
			const hash = await this.bcrypt.hash(newPassword, 10);
			const updatedUser = await this.userRepository.update({ password: hash });
			logger.info(
				`200 - Updated User ${updatedUser.username} Password - /auth/reset-password - PUT`,
			);
			return res.status(200).json({ message: `Updated User ${updatedUser.username} Password` });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = AuthService;
