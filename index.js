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

// JUST USE PM2