const { logger } = require('../middleware/log.middleware');

class AuthService {
	constructor({ userRepository, bcrypt, jwt }) {
		this.userRepository = userRepository;
		this.bcrypt = bcrypt;
		this.jwt = jwt;
	}

	async register({ name, username, address, role, email, password, next }) {
		const existingUser = await this.userRepository.getByEmail(email);
		if (existingUser) {
			next({
				status: 400,
				message: `A user with the email: ${email}, already exists.`,
			});
		}

		const hash = await this.bcrypt.hash(password, 10);
		let data = { name, username, role, email, password: hash };
		if (role === 'CLIENT') data['address'] = address;
		const newUser = await this.userRepository.create(data);
		return newUser;
	}

	async login({ email, password, next }) {
		const user = await this.userRepository.getByEmail(email);
		const passwordIsCorrect = await this.bcrypt.compare(
			password,
			user.password,
		);
		if (!user || !passwordIsCorrect)
			next({ status: 400, message: 'Invalid email or password.' });

		const token = this.jwt.generateToken({ userId: user.id });
		return { user, token };
	}
}

module.exports = AuthService;
