class CartModel {
	constructor({ prisma }) {
		this.prisma = prisma;
	}

	get = async () => {
		return await this.prisma.cart.findMany({ include: { products: true } });
	};

	getById = async user_id => {
		return await this.prisma.cart.findUnique({
			where: { user_id },
			include: { products: true },
		});
	};

	create = async ({ user_id, product_id, quantity }) => {
		return await this.prisma.cart.create({
			data: {
				user_id,
				products: {
					create: {
						quantity,
						product_id,
					},
				},
			},
		});
	};

	update = async ({ user_id, products }) => {
		// Update data
		let data = {};
		// Check if products array is not null
		if (products) data['products'] = products;
		return await this.prisma.cart.update({ where: { user_id }, data });
	};

	destroyItem = async ({ cart_id, product_id }) => {
		return await this.prisma.cart_item.delete({
			where: {
				cart_id,
				product_id,
			},
		});
	};

	destroy = async cart_id => {
		// Deleting all the cart items
		const deleteCartItems = await this.prisma.cart_item.deleteMany({
			where: { cart_id },
		});
		// Deleting the cart
		const deleteCart = await this.prisma.cart.delete({ where: { id: cart_id } });
		// This will first delete the cart items, then finally delete the cart
		return await this.prisma.$transaction([deleteCartItems, deleteCart]);
	};
}

module.exports = CartModel;
