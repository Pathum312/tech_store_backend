class CategoryRepository {
	constructor({ categoryModel }) {
		this.categoryModel = categoryModel;
	}

	async get({ name }) {
		return await this.categoryModel.get({ name });
	}

	async getById(id) {
		return await this.categoryModel.getById(id);
	}

	async create({ name, description }) {
		return await this.categoryModel.create({ name, description });
	}

	async update({ id, name, description }) {
		return await this.categoryModel.update({ id, name, description });
	}

	async destroy(id) {
		return await this.categoryModel.destroy(id);
	}
}

module.exports = CategoryRepository;
