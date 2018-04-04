// server.js

// 'use strict'

// first we import our dependencies…
const log = require('simple-console-logger');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
/* eslint import/no-unresolved: 2 */
const User = require('../server/models/user');

const app = express();
const router = express.Router();
// set our port to either a predetermined port number if you have set
// it up, or 3001
const port = process.env.API_PORT || 3001;

// MONGO
// db config
mongoose.connect('mongodb://admin@localhost:32772/exchange');

// now we should configure the API to use bodyParser and look for
// JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// To prevent errors from Cross Origin Resource Sharing, we will set
// our headers to allow CORS with middleware like so:
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
	// and remove cacheing so we get the most recent users
	res.setHeader('Cache-Control', 'no-cache');
	next();
});
// now we can set the route path & initialize the API
router.get('/api', (req, res) => {
	res.json({ message: 'API Initialized!' });
});
// Use our router configuration when we call /api
app.use('/api', router);
// starts the server and listens for requests
app.listen(port, () => {
	console.log(`api running on port ${port}`);
});

router.route('/users/').get((req, res) => {
	User.find((err, users) => {
		if (err) {
			res.send(err);
			// responds with a json object of our database users.
			res.json(users);
		}
		return users;
	});
});

router.route('/user/authenticate/').post((req, res) => {
	log.info(req.body);
	User.findOne({ displayname: req.body.username, password: req.body.password }, (err, user) => res.json(user));
});

// Add User
// adding the /user/add route to our /api router
router.route('/user/add').post((req, res) => {
	const user = new User();
	user.name = req.body.name;
	user.surname = req.body.surname;
	user.displayname = req.body.displayname;
	user.password = req.body.password;
	user.email = req.body.email;
	user.save((err) => {
		if (err) {
			res.send(err);
		}
		res.json({ user });
	});
});
