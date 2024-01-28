const express = require('express');
const router = express.Router();
const { UserModel } = require('../models');
const { UserRepository } = require('../repositories');
const { UserService } = require('../services');
const { Prisma } = require('../config');
const userService = new UserService({
	userRepository: new UserRepository({
		userModel: new UserModel({ prisma: Prisma }),
	}),
});

router.get('/', async (req, res, next) => {
	await userService.get(req, res, next);
});

router.get('/:id', async (req, res, next) => {
	await userService.getById(req, res, next);
});

router.put('/', async (req, res, next) => {
	await userService.update(req, res, next);
});

router.delete('/:id', async (req, res, next) => {
	await userService.destroy(req, res, next);
});

module.exports = router;
