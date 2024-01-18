const app = require('./src/app');
const http = require('http');
const { ENV } = require('./src/config');
const { logger } = require('./src/middleware/log.middleware');

app.set('port', ENV.PORT);
const server = http.createServer(app);

server.listen(ENV.PORT, () => {
	logger.info(`Server is running on http://localhost:${ENV.PORT}`);
});
server.on('error', onError);

function onError(error) {
	console.log(error);
	if (error.syscall !== 'listen') logger.error(error);

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			logger.error(`Port ${ENV.PORT} requires elevated privileges`);
			break;
		case 'EADDRINUSE':
			logger.error(`Port ${ENV.PORT} is already in use.`);
			break;
		default:
			logger.error(error);
			break;
	}
}
