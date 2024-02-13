const express = require('express');
const router = express.Router();
const { OrderModel, CartModel } = require('../models');
const { CartRepository, OrderRepository } = require('../repositories');
const { OrderService } = require('../services');
const { Prisma } = require('../config');
const { logger } = require('../middleware/log.middleware');
const orderService = new OrderService({
	orderRepository: new OrderRepository({
		orderModel: new OrderModel({ prisma: Prisma }),
	}),
	cartRepository: new CartRepository({
		cartModel: new CartModel({ prisma: Prisma }),
	}),
	logger,
});

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Add cart to an order
 *     tags: [Order]
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
 *             required:
 *               - user_id
 *     responses:
 *       '200':
 *         description: Success response.
 *       '500':
 *         description: Internal server error.
 */
router.post('/', async (req, res, next) => {
	await orderService.create(req, res, next);
});

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get order listings
 *     tags: [Order]
 *     security:
 *       - JWTAuth: []
 *     parameters: [
 *      {
 *          name: 'user_id',
 *          in: 'query',
 *          description: '65dsfgfdsg'
 *      },
 *      {
 *          name: 'status',
 *          in: 'query',
 *          description: 'PENDING'
 *      },
 *     ]
 *     responses:
 *       '200':
 *         description: Success response.
 *       '500':
 *         description: Internal server error.
 */
router.get('/', async (req, res, next) => {
	await orderService.get(req, res, next);
});

/**
 * @swagger
 * /orders:
 *   put:
 *     summary: Update order status
 *     tags: [Order]
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
 *               status:
 *                 type: string
 *             required:
 *               - id
 *               - status
 *     responses:
 *       '200':
 *         description: Success response.
 *       '500':
 *         description: Internal server error.
 */
router.put('/', async (req, res, next) => {
	await orderService.update(req, res, next);
});

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete order by id
 *     tags: [Order]
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
	await orderService.destroy(req, res, next);
});

module.exports = router;
