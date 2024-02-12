const express = require('express');
const router = express.Router();
const { UserModel } = require('../models');
const { UserRepository } = require('../repositories');
const { AuthService } = require('../services');
const { Bcrypt, JWT, Prisma } = require('../config');
const { logger } = require('../middleware/log.middleware');
/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: API endpoints for managing authentication
 */
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
 *       '200':
 *         description: Success response.
 *       '400':
 *         description: Bad request.
 *       '500':
 *         description: Internal server error.
 */
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
