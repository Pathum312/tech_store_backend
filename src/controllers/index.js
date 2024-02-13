/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: API endpoints for managing authentication
 */
const AuthController = require('./auth.controller');
/**
 * @swagger
 * tags:
 *   - name: User
 *     description: API endpoints for user account management
 */
const UserController = require('./user.controller');
const CategoryController = require('./category.controller');
const ProductController = require('./product.controller');
const CartController = require('./cart.controller');
const OrderController = require('./order.controller');
const ReviewController = require('./review.controller');
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     JWTAuth:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 */

module.exports = {
	UserController,
	AuthController,
	CategoryController,
	ProductController,
	CartController,
	OrderController,
	ReviewController,
};
