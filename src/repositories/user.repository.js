class UserRepository {
	constructor({ userModel }) {
		this.userModel = userModel;
	}

	async get({ username, name, email }) {
		return await this.userModel.get({ username, name, email });
	}

	async create({ name, username, address, role, email, password }) {
		return await this.userModel.create({
			name,
			username,
			address,
			role,
			email,
			password,
		});
	}

	async update({ id, name, username, address, email }) {
		return await this.userModel.update({ id, name, username, address, email });
	}

	async destroy({ id }) {
		return await this.userModel.destroy({ id });
	}

	async getById(id) {
		return await this.userModel.getById(id);
	}

	async getByEmail(email) {
		return await this.userModel.getByEmail(email);
	}
}

module.exports = UserRepository;
