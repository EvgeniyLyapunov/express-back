const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { faker } = require('@faker-js/faker');

const app = express();

app.use(cors());

app.use(
	bodyParser.json({
		type(req) {
			return true;
		},
	})
);

app.use((req, res, next) => {
	res.setHeader('Content-Type', 'application/json');
	next();
});

app.get('/messages/unread', async (request, response) => {
	try {
		const unreadMessages = {
			status: 'ok',
			timestamp: Date.now(),
			messages: giveUnreadMessages(),
		};

		response.send(JSON.stringify(unreadMessages)).end();
	} catch (error) {
		response.status(500).send(JSON.stringify({ error: error.message }));
	}
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log('Application listening on port 5000!');
});

function giveUnreadMessages() {
	const mess = [];
	const count = Math.floor(Math.random() * 3 + 1);

	for (let i = 0; i < count; i++) {
		const message = {
			id: faker.string.uuid(),
			from: faker.internet.email(),
			subject: faker.lorem.sentence({ min: 1, max: 4 }),
			body: faker.lorem.paragraph({ min: 1, max: 4 }),
			received: Date.now(),
		};

		mess.push(message);
	}

	return mess;
}
