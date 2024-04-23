class OrderModel {
	constructor({ prisma }) {
		this.prisma = prisma;
	}

	get = async ({ user_id, status }) => {
		// Query filters
		let where = {};
		// Find orders by user id
		// Only if user id is sent in params
		if (user_id) where['user_id'] = user_id;
		// Find a order by a specific status
		if (status) where['status'] = status;
		return await this.prisma.order.findMany({
			where,
			include: {
				items: {
					include: {
						product: true
					}
				}
			}
		});
	};

	getById = async id => {
		return await this.prisma.order.findUnique({
			where: { id },
			include: { items: true },
		});
	};

	create = async ({ user_id, products }) => {
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
		return await this.prisma.$transaction(async transaction => {
			// Add the order
			const addedOrder = await transaction.order.create({
				data: {
					user_id,
					total_amount: totalAmount,
					items: { create: items },
				},
			});
			// Iterate through all the order items
			for (const item of items) {
				// Find the products in the order
				const product = await transaction.product.findUnique({ where: { id: item.product_id } });
				// Finally reduce the stock of the product with the quantity bought by user
				await transaction.product.update({
					where: { id: item.product_id },
					data: { stock: product.stock - item.quantity },
				});
			}
			return addedOrder;
		});
	};

	update = async ({ id, status }) => {
		// Update data
		let data = {};
		// Check if status is not null
		data['status'] = status;
		return await this.prisma.order.update({ where: { id }, data });
	};

	destroy = async id => {
		// Deleting all the order items
		const deleteOrderItems = this.prisma.order_Item.deleteMany({
			where: { order_id: id },
		});
		// Deleting the order
		const deleteOrder = this.prisma.order.delete({ where: { id } });
		// This will first delete the order items, then finally delete the order
		return await this.prisma.$transaction([deleteOrderItems, deleteOrder]);
	};
}

module.exports = OrderModel;
