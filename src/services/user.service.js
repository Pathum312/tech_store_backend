class UserService {
	constructor({ userRespository, jwt }) {
		this.userRespository = userRespository;
		this.jwt = jwt;
	}

	async get({ username, name, email }) {
		return await this.userRespository.get({ username, name, email });
	}

	async getById(id) {
		return await this.userRespository.getById(id);
	}
}

module.exports = UserService;
