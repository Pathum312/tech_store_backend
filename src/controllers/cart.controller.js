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

router.get('/', async (req, res, next) => {
	await cartService.get(req, res, next);
});

router.get('/:id', async (req, res, next) => {
	await cartService.getById(req, res, next);
});

router.post('/add-to-cart', async (req, res, next) => {
	await cartService.addToCart(req, res, next);
});

router.patch('/delete-item', async (req, res, next) => {
	await cartService.destroyItem(req, res, next);
});

router.delete('/:id', async (req, res, next) => {
	await cartService.destroy(req, res, next);
});

module.exports = router;
