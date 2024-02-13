const express = require('express');
const router = express.Router();
const { CategoryModel } = require('../models');
const { CategoryRepository } = require('../repositories');
const { CategoryService } = require('../services');
const { Prisma } = require('../config');
const { logger } = require('../middleware/log.middleware');
const categoryService = new CategoryService({
	categoryRepository: new CategoryRepository({
		categoryModel: new CategoryModel({ prisma: Prisma }),
	}),
	logger,
});

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Add a category
 *     tags: [Category]
 *     security:
 *       - JWTAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 default: PS4 Games
 *               description:
 *                 type: string
 *                 default: Games for the PS4
 *             required:
 *               - name
 *               - description
 *     responses:
 *       '201':
 *         description: Created.
 *       '500':
 *         description: Internal server error.
 */
router.post('/', async (req, res, next) => {
	await categoryService.create(req, res, next);
});

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get categories list
 *     tags: [Category]
 *     security:
 *       - JWTAuth: []
 *     parameters: [
 *      {
 *          name: 'name',
 *          in: 'query',
 *          description: 'PS4 Games'
 *      },
 *     ]
 *     responses:
 *       '200':
 *         description: Success response.
 *       '500':
 *         description: Internal server error.
 */
router.get('/', async (req, res, next) => {
	await categoryService.get(req, res, next);
});

/**
 * @swagger
 * /categories:
 *   put:
 *     summary: Update category details
 *     tags: [Category]
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
 *                 default: PS4 Games
 *               description:
 *                 type: string
 *                 default: Games for the PS4
 *             required:
 *               - id
 *               - name
 *               - description
 *     responses:
 *       '200':
 *         description: Internal server error.
 *       '500':
 *         description: Internal server error.
 */
router.put('/', async (req, res, next) => {
	await categoryService.update(req, res, next);
});

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete category by id
 *     tags: [Category]
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
	await categoryService.destroy(req, res, next);
});

module.exports = router;
