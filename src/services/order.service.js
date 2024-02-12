class OrderService {
	constructor({ orderRepository, cartRepository, logger }) {
		this.orderRepository = orderRepository;
		this.cartRepository = cartRepository;
		this.logger = logger;
	}

	get = async (req, res, next) => {
		try {
			const { user_id, status } = req.query;
			const orders = await this.orderRepository.get({ user_id, status });
			this.logger.info(`200 - Got Order List - /orders - GET - ${JSON.stringify(req.query)}`);
			return res.status(200).json(orders);
		} catch (error) {
			next(error);
		}
	};

	create = async (req, res, next) => {
		try {
			const { user_id } = req.body;
			// Find cart using the proivided user id
			const cart = await this.cartRepository.getById(user_id);
			// If there is no cart, send an error
			// This is becuase we need a cart to add the items to the order
			if (!cart) return next({ status: 500, message: 'No items are added to cart' });
			// Create an order
			await this.orderRepository.create({ user_id, products: cart.products });
			// Finally remove the cart
			await this.cartRepository.destroy(cart.id);
			this.logger.info(`201 - Order Added - /orders - POST - ${JSON.stringify(req.body)}`);
			return res.status(201).json({ message: 'Order Added' });
		} catch (error) {
			next(error);
		}
	};

	update = async (req, res, next) => {
		try {
			const { id, status } = req.body;
			// Find order using the proivided id
			const order = await this.orderRepository.getById(id);
			// If no order is found, send an error
			if (!order) return next({ status: 500, message: 'Order does not exist' });
			// Finally update the order status, which is the shipping/order status
			await this.orderRepository.update({ id, status });
			this.logger.info(`200 - Order Updated - /orders - PUT - ${JSON.stringify(req.body)}`);
			return res.status(200).json({ message: 'Order Updated' });
		} catch (error) {
			next(error);
		}
	};

	destroy = async (req, res, next) => {
		try {
			const id = req.params.id;
			// Find order using the proivided id
			const order = await this.orderRepository.getById(id);
			// If no order is found, send an error
			if (!order) return next({ status: 500, message: `Order does not exist` });
			// Finally delete the order
			await this.orderRepository.destroy(id);
			this.logger.info(`200 - Order Deleted - /orders/${id} - DELETE`);
			return res.status(200).json({ message: `Order Deleted` });
		} catch (error) {
			next(error);
		}
	};
}

module.exports = OrderService;
