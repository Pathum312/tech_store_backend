const express = require('express');
const router = express.Router();
const UserModel = require('../models/user.model');
const UserRespository = require('../repositories/user.respository');
const UserService = require('../services/user.service');
// const prisma = require('../config/database');
const { JWT, Prisma } = require('../config');

const userService = new UserService({
	userRespository: new UserRespository({
		userModel: new UserModel({ Prisma }),
	}),
	jwt: JWT,
});

router.get('/', async (req, res) => {
	try {
		const { username, name, email } = req.query;
		const users = await userService.get({ username, name, email });
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const users = await userService.getById(id);
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
