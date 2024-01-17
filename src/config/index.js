const Bcrypt = require('bcrypt');
const JWT = require('./jwt');
const ENV = require('./env');
const Prisma = require('./database');

module.exports = {
	Bcrypt,
	JWT,
	ENV,
	Prisma,
};
