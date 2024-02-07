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

	create = async ({ user_id, product_id, quantity }) => {
		return await this.cartModel.create({ user_id, product_id, quantity });
	};

	update = async ({ user_id, products }) => {
		return await this.cartModel.update({ user_id, products });
	};

	destroyItem = async ({ cart_id, product_id }) => {
		return await this.cartModel.destroyItem({ cart_id, product_id });
	};

	destroy = async cart_id => {
		return await this.cartModel.destroy(cart_id);
	};
}

module.exports = CartRepository;
