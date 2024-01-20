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

	async create({ name, username, address, role, email, password }) {
		return await this.prisma.user.create({
			data: {
				name,
				username,
				address,
				role,
				email,
				password,
			},
		});
	}

	async getById(id) {
		return await this.prisma.user.findUnique({
			where: {
				id,
			},
		});
	}

	async getByEmail(email) {
		return await this.prisma.user.findUnique({
			where: {
				email,
			},
		});
	}
}

module.exports = UserModel;
