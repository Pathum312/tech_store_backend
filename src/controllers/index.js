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
/**
 * @swagger
 * tags:
 *   - name: Category
 *     description: API endpoints for category management
 */
const CategoryController = require('./category.controller');
/**
 * @swagger
 * tags:
 *   - name: Product
 *     description: API endpoints for product management
 */
const ProductController = require('./product.controller');
/**
 * @swagger
 * tags:
 *   - name: Cart
 *     description: API endpoints for cart management
 */
const CartController = require('./cart.controller');
/**
 * @swagger
 * tags:
 *   - name: Order
 *     description: API endpoints for order management
 */
const OrderController = require('./order.controller');
/**
 * @swagger
 * tags:
 *   - name: Review
 *     description: API endpoints for review management
 */
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
