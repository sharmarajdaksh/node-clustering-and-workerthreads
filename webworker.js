const crypto = require('crypto');

const express = require('express');
const app = express();
const Worker = require('webworker-threads').Worker;

app.get('/', (req, res) => {
	const worker = new Worker(function () {
		this.onmessage = function () {
			// Code here executes in the worker thread
			let counter = 0;
			while (counter < 1e9) {
				counter++;
			}

			// Return to the onmessage callback
			this.postMessage(counter);
		};
	});

	worker.onmessage = (cnt) => {
		console.log(cnt);
	};

	worker.postMessage();

	crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
		res.send('Hi there');
	});
});

app.get('/fast', (req, res) => {
	res.send('Hello there');
});

app.listen(3000);

// JUST USE PM2
