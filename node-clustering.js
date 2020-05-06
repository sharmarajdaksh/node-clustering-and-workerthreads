process.env.UV_THREADPOOL_SIZE = 1;
const cluster = require('cluster');

// Is the file being executed in master mode?
if (cluster.isMaster) {
	// Execute index.js to be executed again
	// but this time in child mode.
	cluster.fork();
	cluster.fork();
	cluster.fork();
	cluster.fork();
} else {
	// If running as child, just run the server normally.
	const crypto = require('crypto');

	const express = require('express');
	const app = express();

	app.get('/', (req, res) => {
		crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
			res.send('Hi there');
		});
	});

	app.get('/fast', (req, res) => {
		res.send('Hello there');
	});

	app.listen(3000);
}
