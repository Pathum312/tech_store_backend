const express = require('express');
const router = express.Router();
const { ProductModel } = require('../models');
const { ProductRepository } = require('../repositories');
const { ProductService } = require('../services');
const { Prisma } = require('../config');
const { logger } = require('../middleware/log.middleware');
const productService = new ProductService({
	productRepository: new ProductRepository({
		productModel: new ProductModel({ prisma: Prisma }),
	}),
	logger,
});

router.get('/', async (req, res, next) => {
	await productService.get(req, res, next);
});

router.post('/', async (req, res, next) => {
	await productService.create(req, res, next);
});

router.put('/', async (req, res, next) => {
	await productService.update(req, res, next);
});

router.delete('/:id', async (req, res, next) => {
	await productService.destroy(req, res, next);
});

module.exports = router;
