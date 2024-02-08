class OrderModel {
	constructor({ prisma }) {
		this.prisma = prisma;
	}

	get = async user_id => {
		// Query filters
		let where = {};
		// Find orders by user id
		// Only if user id is sent in params
		if (user_id) where['user_id'] = user_id;
		return await this.prisma.order.findMany({ where, include: { items: true } });
	};

	getById = async user_id => {
		return await this.prisma.order.findUnique({
			where: { user_id },
			include: { items: true },
		});
	};

	create = async ({ products }) => {
		// Product items in the order
		let items = [];
		// Total amount for the products bought by user
		let totalAmount = 0;
		// We will iterate through all the items in the array
		// This is done to get the total order price and remove the cart id
		products.forEach(product => {
			// Adding the price of each item to get the total price
			totalAmount += product.price;
			// Creating a custom product items array for the order
			items.push({
				product_id: product.product_id,
				quantity: product.quantity,
				price: product.price,
			});
		});
		return await this.prisma.order.create({
			data: {
				total_amount: totalAmount,
				items: { createMany: items },
			},
		});
	};

	update = async ({ user_id, status }) => {
		// Update data
		let data = {};
		// Check if status is not null
		data['status'] = status;
		return await this.prisma.order.update({ where: { user_id }, data });
	};

	destroy = async order_id => {
		// Deleting all the order items
		const deleteOrderItems = await this.prisma.order_item.deleteMany({
			where: { order_id },
		});
		// Deleting the order
		const deleteOrder = await this.prisma.cart.delete({ where: { id: order_id } });
		// This will first delete the order items, then finally delete the order
		return await this.prisma.$transaction([deleteOrderItems, deleteOrder]);
	};
}

module.exports = OrderModel;
