const express = require('express');
const cors = require('cors');
const { swaggerUI, specs } = require('./config');
const { handleErrors } = require('./middleware/log.middleware');
const { authenticateUser } = require('./middleware/auth.middleware');
const {
	UserController,
	AuthController,
	CategoryController,
	ProductController,
	CartController,
	OrderController,
	ReviewController,
} = require('./controllers');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Swagger Documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
// API Routes
app.use('/auth', AuthController);
app.use('/users', authenticateUser, UserController);
app.use('/categories', authenticateUser, CategoryController);
app.use('/products', authenticateUser, ProductController);
app.use('/carts', authenticateUser, CartController);
app.use('/orders', authenticateUser, OrderController);
app.use('/reviews', authenticateUser, ReviewController);
// Custom error logger
app.use(handleErrors);

module.exports = app;
