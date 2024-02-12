const Bcrypt = require('bcrypt');
const JWT = require('./jwt');
const ENV = require('./env');
const Prisma = require('./database');
const { swaggerUI, specs } = require('./swagger');

module.exports = {
	Bcrypt,
	JWT,
	ENV,
	Prisma,
	swaggerUI,
	specs,
};
