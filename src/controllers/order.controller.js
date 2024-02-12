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

router.get('/', async (req, res, next) => {
	await orderService.get(req, res, next);
});

router.post('/', async (req, res, next) => {
	await orderService.create(req, res, next);
});

router.put('/', async (req, res, next) => {
	await orderService.update(req, res, next);
});

router.delete('/:id', async (req, res, next) => {
	await orderService.destroy(req, res, next);
});

module.exports = router;
