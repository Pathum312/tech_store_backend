class UserModel {
	constructor({ prisma }) {
		this.prisma = prisma;
	}

	async get({ username, name, email }) {
		// Query filters
		where = {};
		// Find user by username
		if (username) where[username] = username;
		// Find users by name
		if (name) where[name] = name;
		// Find user by email
		if (email) where[email] = email;
		return await this.prisma.user.findMany({
			where: where,
		});
	}

	async getById(id) {
		return await this.prisma.user.findUnique({
			where: {
				id,
			},
		});
	}
}

module.exports = UserModel;
