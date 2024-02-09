class OrderRepository {
	constructor({ orderModel }) {
		this.orderModel = orderModel;
	}

	get = async ({ user_id, status }) => {
		return await this.orderModel.get({ user_id, status });
	};

	getById = async id => {
		return await this.orderModel.getById(id);
	};

	create = async ({ products }) => {
		return await this.orderModel.create({ products });
	};

	update = async ({ id, status }) => {
		return await this.orderModel.update({ id, status });
	};

	destroy = async id => {
		return await this.orderModel.destroy(id);
	};
}

module.exports = OrderRepository;
