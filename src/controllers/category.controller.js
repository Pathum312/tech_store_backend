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

router.get('/', async (req, res, next) => {
	await categoryService.get(req, res, next);
});

router.post('/', async (req, res, next) => {
	await categoryService.create(req, res, next);
});

router.put('/', async (req, res, next) => {
	await categoryService.update(req, res, next);
});

router.delete('/:id', async (req, res, next) => {
	await categoryService.destroy(req, res, next);
});

module.exports = router;
