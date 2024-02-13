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

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Add a product
 *     tags: [Product]
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
 *               description:
 *                 type: string
 *               price:
 *                 type: integer
 *               stock:
 *                 type: integer
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               category_id:
 *                 type: string
 *               user_id:
 *                 type: string
 *             required:
 *               - name
 *               - description
 *               - price
 *               - stock
 *               - images
 *               - category_id
 *               - user_id
 *     responses:
 *       '201':
 *         description: Created.
 *       '500':
 *         description: Internal server error.
 */
router.post('/', async (req, res, next) => {
	await productService.create(req, res, next);
});

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get products list
 *     tags: [Product]
 *     security:
 *       - JWTAuth: []
 *     parameters: [
 *      {
 *          name: 'name',
 *          in: 'query',
 *          description: 'PS4 Games'
 *      },
 *      {
 *          name: 'user_id',
 *          in: 'query',
 *          description: '65rgrsdegwer'
 *      },
 *      {
 *          name: 'category_id',
 *          in: 'query',
 *          description: '65rgrsdegwer'
 *      },
 *     ]
 *     responses:
 *       '200':
 *         description: Success response.
 *       '500':
 *         description: Internal server error.
 */
router.get('/', async (req, res, next) => {
	await productService.get(req, res, next);
});

/**
 * @swagger
 * /products:
 *   put:
 *     summary: Update the product
 *     tags: [Product]
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
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: integer
 *               stock:
 *                 type: integer
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               category_id:
 *                 type: string
 *             required:
 *               - id
 *               - name
 *               - description
 *               - price
 *               - stock
 *               - images
 *               - category_id
 *     responses:
 *       '200':
 *         description: Success reponse.
 *       '500':
 *         description: Internal server error.
 */
router.put('/', async (req, res, next) => {
	await productService.update(req, res, next);
});

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete product by id
 *     tags: [Product]
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
	await productService.destroy(req, res, next);
});

module.exports = router;
