const express = require('express');
const router = express.Router();
const { UserModel } = require('../models');
const { UserRespository } = require('../repositories');
const { UserService } = require('../services');
const { JWT, Prisma } = require('../config');
const { logger } = require('../middleware/log.middleware');

const userService = new UserService({
	userRespository: new UserRespository({
		userModel: new UserModel({ prisma: Prisma }),
	}),
	jwt: JWT,
});

router.get('/', async (req, res, next) => {
	try {
		const { username, name, email } = req.query;
		const users = await userService.get({ username, name, email });
		logger.info(`200 - Got User List - /users - GET`);
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		const id = req.params.id;
		const user = await userService.getById(id);
		logger.info(`200 - Got User ${user.username} Info - /users/:${id} - GET`);
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
