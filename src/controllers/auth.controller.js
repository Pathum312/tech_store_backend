const express = require('express');
const router = express.Router();
const { UserModel } = require('../models');
const { UserRepository } = require('../repositories');
const { AuthService } = require('../services');
const { Bcrypt, JWT, Prisma } = require('../config');
const authService = new AuthService({
	userRepository: new UserRepository({
		userModel: new UserModel({ prisma: Prisma }),
	}),
	bcrypt: Bcrypt,
	jwt: JWT,
});

router.post('/register', async (req, res, next) => {
	await authService.register(req, res, next);
});

router.post('/login', async (req, res, next) => {
	await authService.login(req, res, next);
});

router.patch('/reset-password', async (req, res, next) => {
	await authService.resetPassword(req, res, next);
});

module.exports = router;
