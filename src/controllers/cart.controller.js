const express = require('express');
const router = express.Router();
const { CartModel } = require('../models');
const { CartRepository } = require('../repositories');
const { CartService } = require('../services');
const { Prisma } = require('../config');
const { logger } = require('../middleware/log.middleware');
const cartService = new CartService({
	cartRepository: new CartRepository({
		cartModel: new CartModel({ prisma: Prisma }),
	}),
	logger,
});

/**
 * @swagger
 * /carts/add-to-cart:
 *   post:
 *     summary: Add product to cart
 *     tags: [Cart]
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
 *               quantity:
 *                 type: integer
 *               price:
 *                 type: integer
 *             required:
 *               - user_id
 *               - product_id
 *               - quantity
 *               - price
 *     responses:
 *       '200':
 *         description: Success response.
 *       '500':
 *         description: Internal server error.
 */
router.post('/add-to-cart', async (req, res, next) => {
	await cartService.addToCart(req, res, next);
});

/**
 * @swagger
 * /carts:
 *   get:
 *     summary: Get carts list
 *     tags: [Cart]
 *     security:
 *       - JWTAuth: []
 *     parameters: []
 *     responses:
 *       '200':
 *         description: Success response.
 *       '500':
 *         description: Internal server error.
 */
router.get('/', async (req, res, next) => {
	await cartService.get(req, res, next);
});

/**
 * @swagger
 * /carts/{id}:
 *   get:
 *     summary: Get cart details
 *     tags: [Cart]
 *     security:
 *       - JWTAuth: []
 *     parameters: [
 *      {
 *          name: 'id',
 *          in: 'path',
 *          description: '65dsfgfdsg'
 *      },
 *     ]
 *     responses:
 *       '200':
 *         description: Success response.
 *       '500':
 *         description: Internal server error.
 */
router.get('/:id', async (req, res, next) => {
	await cartService.getById(req, res, next);
});

/**
 * @swagger
 * /carts/delete-item:
 *   patch:
 *     summary: Remove an product from cart
 *     tags: [Cart]
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
 *             required:
 *               - user_id
 *               - product_id
 *     responses:
 *       '200':
 *         description: Success response.
 *       '500':
 *         description: Internal server error.
 */
router.patch('/delete-item', async (req, res, next) => {
	await cartService.destroyItem(req, res, next);
});

/**
 * @swagger
 * /carts/{id}:
 *   delete:
 *     summary: Delete cart by id
 *     tags: [Cart]
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
	await cartService.destroy(req, res, next);
});

module.exports = router;
