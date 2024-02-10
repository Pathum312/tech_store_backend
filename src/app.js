const express = require('express');
const cors = require('cors');
const { Swagger } = require('./config');
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
app.use('/api-docs', Swagger.swaggerUI.serve, Swagger.swaggerUI.setup(Swagger.specs));
// API Routes
app.use('/auth', AuthController);
app.use('/users', UserController);
app.use('/categories', CategoryController);
app.use('/products', ProductController);
app.use('/carts', CartController);
app.use('/orders', OrderController);
app.use('/reviews', ReviewController);
// Custom error logger
app.use(handleErrors);

module.exports = app;
