class UserRespository {
	constructor({ userModel }) {
		this.userModel = userModel;
	}

	async get({ username, name, email }) {
		return await this.userModel.get({ username, name, email });
	}

	async getById(id) {
		return await this.userModel.getById(id);
	}
}

module.exports = UserRespository;
