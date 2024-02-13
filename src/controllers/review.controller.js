const express = require('express');
const router = express.Router();
const { ReviewModel } = require('../models');
const { ReviewRepository } = require('../repositories');
const { ReviewService } = require('../services');
const { Prisma } = require('../config');
const { logger } = require('../middleware/log.middleware');
const reviewService = new ReviewService({
	reviewRepository: new ReviewRepository({
		reviewModel: new ReviewModel({ prisma: Prisma }),
	}),
	logger,
});

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Add a review for an product
 *     tags: [Review]
 *     security:
 *       - JWTAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               product_id:
 *                 type: string
 *               rating:
 *                 type: integer
 *               comment:
 *                 type: string
 *             required:
 *               - user_id
 *               - product_id
 *               - rating
 *               - comment
 *     responses:
 *       '200':
 *         description: Success response.
 *       '500':
 *         description: Internal server error.
 */
router.post('/', async (req, res, next) => {
	await reviewService.create(req, res, next);
});

/**
 * @swagger
 * /reviews:
 *   put:
 *     summary: Edit review
 *     tags: [Review]
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
 *               rating:
 *                 type: integer
 *               comment:
 *                 type: string
 *             required:
 *               - id
 *               - rating
 *               - comment
 *     responses:
 *       '200':
 *         description: Success response.
 *       '500':
 *         description: Internal server error.
 */
router.put('/', async (req, res, next) => {
	await reviewService.update(req, res, next);
});

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Delete review by id
 *     tags: [Review]
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
	await reviewService.destroy(req, res, next);
});

module.exports = router;
