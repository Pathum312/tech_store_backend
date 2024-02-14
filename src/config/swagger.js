const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Tech Store APIs',
			version: '0.1.0',
			description: 'APIs for the Tech Store Site',
			contact: {
				name: 'Pathum Senanayake',
				email: 'pathumsenanayake@proton.me',
				url: 'https://github.com/Pathum312',
			},
		},
		servers: [
			{
				url: 'http://localhost:8000',
				description: 'Local Server',
			},
			{
				url: 'https://tech-store-sd74.onrender.com',
				description: 'Live Server',
			},
		],
	},
	apis: ['./src/controllers/*.js'],
};

const specs = swaggerJsDoc(options);

module.exports = { swaggerUI, specs };
