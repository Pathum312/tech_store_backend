const express = require('express');
const router = express.Router();
const { UserModel } = require('../models');
const { UserRepository } = require('../repositories');
const { AuthService } = require('../services');
const { Bcrypt, JWT, Prisma } = require('../config');
const { logger } = require('../middleware/log.middleware');
const authService = new AuthService({
	userRepository: new UserRepository({
		userModel: new UserModel({ prisma: Prisma }),
	}),
	bcrypt: Bcrypt,
	jwt: JWT,
	logger,
});

router.post('/register', async (req, res, next) => {
	await authService.register(req, res, next);
});

router.post('/login', async (req, res, next) => {
	await authService.login(req, res, next);
});

router.post('/logout', async (req, res, next) => {
	await authService.logout(req, res, next);
});

router.patch('/reset-password', async (req, res, next) => {
	await authService.resetPassword(req, res, next);
});

module.exports = router;
