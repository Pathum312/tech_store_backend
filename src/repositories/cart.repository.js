class CartRepository {
	constructor({ cartModel }) {
		this.cartModel = cartModel;
	}

	get = async () => {
		return await this.cartModel.get();
	};

	getById = async user_id => {
		return await this.cartModel.getById(user_id);
	};

	create = async ({ user_id, product_id, quantity, price }) => {
		return await this.cartModel.create({ user_id, product_id, quantity, price });
	};

	update = async ({ cart_id, product_id, quantity, price, type }) => {
		return await this.cartModel.update({ cart_id, product_id, quantity, price, type });
	};

	destroyItem = async ({ cart_id, product_id }) => {
		return await this.cartModel.destroyItem({ cart_id, product_id });
	};

	destroy = async cart_id => {
		return await this.cartModel.destroy(cart_id);
	};
}

module.exports = CartRepository;
