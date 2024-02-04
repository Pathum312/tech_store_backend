class CategoryModel {
	constructor({ prisma }) {
		this.prisma = prisma;
	}

	async get({ name }) {
		// Query filters
		let where = {};
		// Find category by name
		// Only if name is sent in params
		if (name) where['name'] = name;
		return await this.prisma.category.findMany({ where });
	}

	async getById(id) {
		return await this.prisma.category.findUnique({ where: { id } });
	}

	async create({ name, description }) {
		return await this.prisma.create({ data: { name, description } });
	}

	async update({ id, name, description }) {
		// Update data
		let data = {};
		// Check if name is not null
		if (name) data['name'] = name;
		// Check if description is not null
		if (description) data['description'] = description;
		return await this.prisma.category.update({ where: { id } }, data);
	}

	async destroy(id) {
		return await this.prisma.category.delete({ where: { id } });
	}
}

module.exports = CategoryModel;
