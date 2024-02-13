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

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a user, CLIENT, SELLER, or ADMIN account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 default: John Doe
 *               username:
 *                 type: string
 *                 default: johndoe123
 *               address:
 *                 type: object
 *                 default: {stree: "Kaviraja Mawatha", city: "Panadura", state: "Kalutara", zip: 12500, country: "Sri Lanka"}
 *               role:
 *                 type: string
 *                 default: CLIENT
 *               email:
 *                 type: string
 *                 default: johndoe@example.com
 *               password:
 *                 type: string
 *                 default: password
 *             required:
 *               - name
 *               - username
 *               - role
 *               - email
 *               - password
 *     responses:
 *       '201':
 *         description: Created.
 *       '400':
 *         description: Bad request.
 *       '500':
 *         description: Internal server error.
 */
router.post('/register', async (req, res, next) => {
	await authService.register(req, res, next);
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login API, will return a JWT token in response
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 default: johndoe@example.com
 *               password:
 *                 type: string
 *                 default: password
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Success response.
 *       '400':
 *         description: Bad request.
 *       '500':
 *         description: Internal server error.
 */
router.post('/login', async (req, res, next) => {
	await authService.login(req, res, next);
});

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout API, will delete token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 default: 65b675sd87cd67
 *             required:
 *               - id
 *     responses:
 *       '200':
 *         description: Success response.
 *       '400':
 *         description: Bad request.
 *       '500':
 *         description: Internal server error.
 */
router.post('/logout', async (req, res, next) => {
	await authService.logout(req, res, next);
});

/**
 * @swagger
 * /auth/reset-password:
 *   patch:
 *     summary: Reset users password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 default: 65b675sd87cd67
 *               password:
 *                 type: string
 *                 default: password
 *               newPassword:
 *                 type: object
 *                 default: password123
 *             required:
 *               - id
 *               - password
 *               - newPassword
 *     responses:
 *       '200':
 *         description: Success Response.
 *       '400':
 *         description: Bad request.
 *       '500':
 *         description: Internal server error.
 */
router.patch('/reset-password', async (req, res, next) => {
	await authService.resetPassword(req, res, next);
});

module.exports = router;
