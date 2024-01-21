const express = require('express');
const router = express.Router();
const { UserModel } = require('../models');
const { UserRespository } = require('../repositories');
const { AuthService } = require('../services');
const { Bcrypt, JWT, Prisma } = require('../config');
const { logger } = require('../middleware/log.middleware');

const authService = new AuthService({
	userRepository: new UserRespository({
		userModel: new UserModel({ prisma: Prisma }),
	}),
	bcrypt: Bcrypt,
	jwt: JWT,
});

router.post('/register', async (req, res, next) => {
	try {
		const { name, username, address, role, email, password } = req.body;
		const newUser = await authService.register({
			name,
			username,
			address,
			role,
			email,
			password,
			next,
		});
		logger.info(`201 - Added User ${username} - /auth/register - POST`);
		res.status(201).json(newUser);
	} catch (error) {
		next(error);
	}
});

router.post('/login', async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const { user, token } = await authService.login({ email, password, next });
		logger.info(`200 - User ${user.username} Logged In - /auth/login - POST`);
		res.status(200).json({ user, token });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
