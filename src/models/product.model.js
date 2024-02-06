class ProductModel {
	constructor({ prisma }) {
		this.prisma = prisma;
	}

	async get({ name, user_id, category_id }) {
		// Query filters
		let where = {};
		// Find product by name
		// Only if name is sent in params
		if (name) where['name'] = name;
		// Find all products listed by that seller
		if (user_id) where['user_id'] = user_id;
		// Find all products for that particular category
		if (category_id) where['category_id'] = category_id;
		return await this.prisma.product.findMany({ where });
	}

	async getById(id) {
		return await this.prisma.product.findUnique({ where: { id } });
	}

	async create({ name, description, price, stock, images, category_id, user_id }) {
		return await this.prisma.product.create({
			data: {
				name,
				description,
				price,
				stock,
				images,
				category_id,
				user_id,
			},
		});
	}

	async update({ id, name, description, price, stock, images, category_id }) {
		// Update data
		let data = {};
		// Check if name is not null
		if (name) data['name'] = name;
		// Check if description is not null
		if (description) data['description'] = description;
		// Check if price is not null
		if (price) data['price'] = price;
		// Check if stock is not null
		if (stock) data['stock'] = stock;
		// Check if images is not null
		if (images) data['images'] = images;
		// Check if category_id is not null
		if (category_id) data['category_id'] = category_id;
		return await this.prisma.product.update({ where: { id }, data });
	}

	async destroy(id) {
		return await this.prisma.product.delete({ where: { id } });
	}
}

module.exports = ProductModel;
