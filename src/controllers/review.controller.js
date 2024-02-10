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

router.post('/', async (req, res, next) => {
	await reviewService.create(req, res, next);
});

router.put('/', async (req, res, next) => {
	await reviewService.update(req, res, next);
});

router.delete('/:id', async (req, res, next) => {
	await reviewService.destroy(req, res, next);
});

module.exports = router;
