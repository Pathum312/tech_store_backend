const express = require('express');
const router = express.Router();
const { UserModel } = require('../models');
const { UserRepository } = require('../repositories');
const { UserService } = require('../services');
const { Prisma } = require('../config');
const { logger } = require('../middleware/log.middleware');
const userService = new UserService({
	userRepository: new UserRepository({
		userModel: new UserModel({ prisma: Prisma }),
	}),
	logger,
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get user listing
 *     tags: [User]
 *     security:
 *       - JWTAuth: []
 *     parameters: [
 *      {
 *          name: 'username',
 *          in: 'query',
 *          description: 'johndoe123'
 *      },
 *      {
 *          name: 'name',
 *          in: 'query',
 *          description: 'John Doe'
 *      },
 *      {
 *          name: 'email',
 *          in: 'query',
 *          description: 'johndoe@example.com'
 *      },
 *     ]
 *     responses:
 *       '200':
 *         description: Success response.
 *       '500':
 *         description: Internal server error.
 */
router.get('/', async (req, res, next) => {
	await userService.get(req, res, next);
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by id
 *     tags: [User]
 *     security:
 *       - JWTAuth: []
 *     parameters: [
 *      {
 *          name: 'id',
 *          in: 'path',
 *          description: '65dsfsfbfh5634'
 *      },
 *     ]
 *     responses:
 *       '200':
 *         description: Success response.
 *       '500':
 *         description: Internal server error.
 */
router.get('/:id', async (req, res, next) => {
	await userService.getById(req, res, next);
});

/**
 * @swagger
 * /users:
 *   put:
 *     summary: Update user details
 *     tags: [User]
 *     security:
 *       - JWTAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 default: 65rrfgsfgr23w45gfsd
 *               name:
 *                 type: string
 *                 default: John Doe
 *               username:
 *                 type: string
 *                 default: johndoe123
 *               address:
 *                 type: object
 *                 default: {stree: "Kaviraja Mawatha", city: "Panadura", state: "Kalutara", zip: 12500, country: "Sri Lanka"}
 *             required:
 *               - id
 *               - name
 *               - username
 *     responses:
 *       '200':
 *         description: Success reponse.
 *       '400':
 *         description: Bad request.
 *       '500':
 *         description: Internal server error.
 */
router.put('/', async (req, res, next) => {
	await userService.update(req, res, next);
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user by id
 *     tags: [User]
 *     security:
 *       - JWTAuth: []
 *     parameters: [
 *      {
 *          name: 'id',
 *          in: 'path',
 *          description: '65dsfsfbfh5634'
 *      },
 *     ]
 *     responses:
 *       '200':
 *         description: Success response.
 *       '500':
 *         description: Internal server error.
 */
router.delete('/:id', async (req, res, next) => {
	await userService.destroy(req, res, next);
});

module.exports = router;
