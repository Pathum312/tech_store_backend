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

	async update({ id, name, username, address, email, password, login }) {
		return await this.userModel.update({
			id,
			name,
			username,
			address,
			email,
			password,
			login,
		});
	}

	async destroy(id) {
		return await this.userModel.destroy(id);
	}

	async getById(id) {
		return await this.userModel.getById(id);
	}

	async getByEmail(email) {
		return await this.userModel.getByEmail(email);
	}

	async getByUsername(username) {
		return await this.userModel.getByUsername(username);
	}
}

module.exports = UserRepository;
