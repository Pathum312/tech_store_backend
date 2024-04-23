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
			include: {
				products: {
					include: {
						product: true
					}
				}
			},
		});
	};

	create = async ({ user_id, product_id, quantity, price }) => {
		return await this.prisma.cart.create({
			data: {
				user_id,
				products: {
					create: {
						quantity,
						price,
						product_id,
					},
				},
			},
		});
	};

	update = async ({ cart_id, product_id, quantity, price, type }) => {
		// Data body with common data for both adding and updating a cart item
		let data = { quantity, price: price * quantity };
		switch (type) {
			// If update, update the changed quantity and price
			case 'UPDATE':
				return await this.prisma.cart_Item.update({
					where: { cart_id, product_id },
					data,
				});
			// If add, add new product to cart
			case 'ADD':
				// Add cart reference id
				data['cart_id'] = cart_id;
				// Add product reference id
				data['product_id'] = product_id;
				return await this.prisma.cart_Item.create({ data });
			default:
				break;
		}
	};

	// Remove a specific product from the cart
	destroyItem = async ({ cart_id, product_id }) => {
		return await this.prisma.cart_Item.delete({
			where: {
				cart_id,
				product_id,
			},
		});
	};

	destroy = async cart_id => {
		// Deleting all the cart items
		const deleteCartItems = this.prisma.cart_Item.deleteMany({
			where: { cart_id },
		});
		// Deleting the cart
		const deleteCart = this.prisma.cart.delete({ where: { id: cart_id } });
		// This will first delete the cart items, then finally delete the cart
		return await this.prisma.$transaction([deleteCartItems, deleteCart]);
	};
}

module.exports = CartModel;
