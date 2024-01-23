class UserModel {
	constructor({ prisma }) {
		this.prisma = prisma;
	}

	async get({ username, name, email }) {
		// Query filters
		let where = {};
		// Find user by username
		if (username) where['username'] = username;
		// Find users by name
		if (name) where['name'] = name;
		// Find user by email
		if (email) where['email'] = email;
		return await this.prisma.user.findMany({ where });
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

	async update({ id, name, username, address, email }) {
		// Update data
		let data = {};
		// Check if name is not null
		if (name) data['name'] = name;
		// Check if username is not null
		if (name) data['username'] = username;
		// Check if address is not null
		if (name) data['address'] = address;
		// Check if email is not null
		if (email) data['email'] = email;
		return await this.prisma.user.update({
			where: { id },
			data,
		});
	}

	async destroy({ id }) {
		return await this.prisma.delete({ where: { id } });
	}
}

module.exports = UserModel;
