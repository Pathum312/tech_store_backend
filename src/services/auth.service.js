class AuthService {
	constructor({ userRepository, bcrypt, jwt, logger }) {
		this.userRepository = userRepository;
		this.bcrypt = bcrypt;
		this.jwt = jwt;
		this.logger = logger;
	}

	async register(req, res, next) {
		try {
			const { name, username, address, role, email, password } = req.body;
			// Check if there is an user with the provided email
			const user = await this.userRepository.getByEmail(email);
			// If email is already used, send error
			if (user)
				return next({
					status: 400,
					message: `A user with the email: ${email}, already exists.`,
				});
			// Encrypt the password
			const hash = await this.bcrypt.hash(password, 10);
			let data = { name, username, role, email, password: hash };
			// Address is only needed by a CLIENT user
			if (role === 'CLIENT') data['address'] = address;
			// Finally create a new user
			const newUser = await this.userRepository.create(data);
			this.logger.info(
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
			// Find user by the provided email
			const user = await this.userRepository.getByEmail(email);
			// Check if password macthes with the encrypted password in the DB
			const passwordIsCorrect = await this.bcrypt.compare(password, user.password);
			// If there is no user or if the password is wrong, send an error
			if (!user || !passwordIsCorrect)
				return next({ status: 400, message: 'Invalid email or password.' });
			// Create a token, which contains the user id
			const token = this.jwt.generateToken({ userId: user.id });
			// Update the DB to show that the user is logged in
			const updatedUser = await this.userRepository.update({ id: user.id, login: true });
			this.logger.info(
				`200 - User ${updatedUser.username} Logged In - /auth/login - POST - ${JSON.stringify(
					req.body,
				)}`,
			);
			return res.status(200).json({ ...updatedUser, token });
		} catch (error) {
			next(error);
		}
	}

	async logout(req, res, next) {
		try {
			const id = req.body.id;
			// Finding user using the provided id
			const user = await this.userRepository.getById(id);
			// Checking if the user exists or whether that user has logged in
			// If both conditions above are false, send an error
			if (!user || !user.login)
				return next({ status: 400, message: 'User does not exist or the user is not logged in' });
			// Updated the user to show that the user has logged out
			const updatedUser = await this.userRepository.update({ id, login: false });
			this.logger.info(
				`200 - User ${updatedUser.username} Logged Out - /auth/logout - POST - ${JSON.stringify(
					req.body,
				)}`,
			);
			return res.status(200).json({ message: `User ${updatedUser.username} Logged Out` });
		} catch (error) {
			next(error);
		}
	}

	async resetPassword(req, res, next) {
		try {
			const { id, password, newPassword } = req.body;
			// Find user using the provided id
			const user = await this.userRepository.getById(id);
			// Check if the provided password macthes the password in the DB
			const passwordIsCorrect = await this.bcrypt.compare(password, user.password);
			// If there is no user or if the password is wrong, send an error
			if (!user || !passwordIsCorrect)
				return next({ status: 400, message: 'Invalid user or password' });
			// Check if the new password doesn't match the password in the DB
			const doesPasswordMatch = await this.bcrypt.compare(newPassword, user.password);
			// If the new password and the password in DB does match, send an error
			if (doesPasswordMatch)
				return next({
					status: 400,
					message: 'New password cannot be the same as the current password',
				});
			// Encrypt the new password
			const hash = await this.bcrypt.hash(newPassword, 10);
			// Update the password in the DB with the new password
			const updatedUser = await this.userRepository.update({ id, password: hash });
			this.logger.info(
				`200 - Updated User ${
					updatedUser.username
				} Password - /auth/reset-password - PUT - ${JSON.stringify(req.body)}`,
			);
			return res.status(200).json({ message: `Updated user ${updatedUser.username}'s password` });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = AuthService;
