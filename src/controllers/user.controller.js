const express = require('express');
const router = express.Router();
const { UserModel } = require('../models');
const { UserRespository } = require('../repositories');
const { UserService } = require('../services');
const { JWT, Prisma } = require('../config');

const userService = new UserService({
	userRespository: new UserRespository({
		userModel: new UserModel({ Prisma }),
	}),
	jwt: JWT,
});

router.get('/', async (req, res, next) => {
	try {
		const { username, name, email } = req.query;
		const users = await userService.get({ username, name, email });
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		const id = req.params.id;
		const user = await userService.getById(id);
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
