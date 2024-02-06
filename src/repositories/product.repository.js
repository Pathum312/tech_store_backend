class ProductRepository {
	constructor({ productModel }) {
		this.productModel = productModel;
	}

	async get({ name, user_id, category_id }) {
		return await this.productModel.get({ name, user_id, category_id });
	}

	async getById(id) {
		return await this.productModel.getById(id);
	}

	async create({ name, description, price, stock, images, category_id, user_id }) {
		return await this.productModel.create({
			name,
			description,
			price,
			stock,
			images,
			category_id,
			user_id,
		});
	}

	async update({ id, name, description, price, stock, images, category_id }) {
		return await this.productModel.update({
			id,
			name,
			description,
			price,
			stock,
			images,
			category_id,
		});
	}

	async destroy(id) {
		return await this.productModel.destroy(id);
	}
}

module.exports = ProductRepository;
