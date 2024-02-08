class CartService {
	constructor({ cartRepository, logger }) {
		this.cartRepository = cartRepository;
		this.logger = logger;
	}

	get = async (req, res, next) => {
		try {
			const carts = await this.cartRepository.get();
			this.logger.info(`200 - Got Cart List - /carts - GET - ${JSON.stringify(req.query)}`);
			return res.status(200).json(carts);
		} catch (error) {
			next(error);
		}
	};

	getById = async (req, res, next) => {
		try {
			const user_id = req.query.user_id;
			const carts = await this.cartRepository.getById(user_id);
			this.logger.info(`200 - Got Cart details - /carts/${user_id} - GET`);
			return res.status(200).json(carts);
		} catch (error) {
			next(error);
		}
	};

	addToCart = async (req, res, next) => {
		try {
			const { user_id, product_id, quantity, price } = req.body;
			// Check if the user already has an active cart
			const cart = await this.cartRepository.getById(user_id);
			// If user has an active cart, we will be updating it
			if (cart) {
				// Checking if the provided product is already in the cart
				const isProductInCart = cart.products.find(productItem => {
					// If the provided product is already in the cart, update the quantity
					// We are assuming that the only updated value is the quantity for the product
					if (productItem.product_id === product_id) {
						productItem['quantity'] = quantity;
						// Price is the price per unit, that is why we multiply it with the quantity
						productItem['price'] = price * quantity;
						return true;
					} else return false;
				});
				// If the provided product is already in the cart update the quantity
				if (isProductInCart)
					await this.cartRepository.update({
						user_id,
						products: cart.products,
					});
				// If the provided product is not in the cart, then add it to the cart
				if (!isProductInCart)
					await this.cartRepository.update({
						user_id,
						products: [
							...cart.products,
							{
								cart_id: cart.id,
								product_id,
								quantity,
								// Price is the price per unit, that is why we multiply it with the quantity
								price: price * quantity,
							},
						],
					});
				this.logger.info(`200 - Cart Updated - /carts/add-to-cart - POST - ${req.body}`);
				return res.status(200).json('Cart Added');
			}
			// If the user does not have an active cart
			// We will add the provided item to a newly created cart
			await this.cartRepository.create({ user_id, product_id, quantity });
			this.logger.info(`200 - Item added to cart - /carts/add-to-cart - POST - ${req.body}`);
			return res.status(200).json('Item added to cart');
		} catch (error) {
			next(error);
		}
	};

	destroyItem = async (req, res, next) => {
		try {
			const { user_id, product_id } = req.body;
			// Find cart using the proivided id
			const cart = await this.cartRepository.getById(user_id);
			// If no cart is found, send an error
			if (!cart) return next({ status: 500, message: `An active cart is not found` });
			// Finally delete the cart item
			await this.cartRepository.destroyItem({
				cart_id: cart.id,
				product_id,
			});
			this.logger.info(`200 - Item Removed - /carts/delete-item - PATCH - ${req.body}`);
			return res.status(200).json({ message: `Item Removed` });
		} catch (error) {
			next(error);
		}
	};

	destroy = async (req, res, next) => {
		try {
			const id = req.params.id;
			// Find cart using the proivided id
			const cart = await this.cartRepository.getById(id);
			// If no cart is found, send an error
			if (!cart) return next({ status: 500, message: `An active cart is not found` });
			// Finally delete the cart
			await this.cartRepository.destroy(cart.id);
			this.logger.info(`200 - Cart Deleted - /carts/${id} - DELETE`);
			return res.status(200).json({ message: `Cart Deleted` });
		} catch (error) {
			next(error);
		}
	};
}

module.exports = CartService;
