// server.js

// 'use strict'

// first we import our dependencies…
const log = require('simple-console-logger');

const express = require('express');
const mongoose = require('mongoose');

const Imap = require('imap');
const LdapAuth = require('ldapauth-fork');
// const { inspect } = require('util');

const bodyParser = require('body-parser');
/* eslint import/no-unresolved: 2 */
const User = require('../server/models/user');
const Album = require('../server/models/album');

const app = express();
const router = express.Router();
// set our port to either a predetermined port number if you have set
// it up, or 3001
const port = process.env.API_PORT || 3001;

let userLogged = false;
// MONGO
// db config
// mongoose.connect('mongodb://myuser:123456@192.168.99.100:32772/exchange');
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

const setUserLogged = (status) => {
	userLogged = status;
	return userLogged;
};

const imapAuthentication = (username, password, callback) => {
	if (username.indexOf('@') > -1) {
		const imap = new Imap({
			user: username,
			password,
			host: 'ex-mail.tiscali.com',
			port: 143,
			tls: false
		});
		imap.connect();
		imap.once('ready', () => {
			log.info('user IMAP logged : ', username);
			imap.end();
			callback(setUserLogged(true));
		});
		imap.once('error', (err) => {
			log.info('imap error', err);
			callback(setUserLogged(false));
		});
	}
};

const ldapAuthentication = (username, password, callback) => {
	const ldapConfig = {
		url: 'ldap://root-dc1.tiscali.com:3268',
		bindDN: username,
		bindCredentials: password,
		searchFilter: `(&(objectCategory=person)(objectClass=user)(mail=${username}))`,
		searchBase: 'dc=tiscali,dc=com'
	};
	const ldap = new LdapAuth(ldapConfig);
	ldap.authenticate(username, password, (err, user) => {
		if (user) {
			console.log('user exist');
			callback(setUserLogged(true));
		} else if (err || !user) {
			console.log('ERR: ', err);
			callback(setUserLogged(false));
		}
	});
};

// ********************* USER SECTION ***************
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
	const { username, password } = req.body;
	ldapAuthentication(username, password, (ldapStatus) => {
		if (ldapStatus) {
			User.findOne({ email: username }, (err, user) => res.json(user));
		} else {
			imapAuthentication(username, password, (imapStatus) => {
				if (imapStatus) {
					User.findOne({ email: username }, (err, user) => res.json(user));
				} else {
					res.send({ err: true, message: 'user already exist' });
				}
			});
		}
	});
});

// Add User
// adding the /user/add route to our /api router
router.route('/user/register').post((req, res) => {
	User.findOne({ username: req.body.username }, (err, user) => {
		if (err) { return err; }
		if (!user) {
			const newUser = new User();
			newUser.firstName = req.body.firstName;
			newUser.lastName = req.body.lastName;
			newUser.username = req.body.username;
			newUser.password = req.body.password;
			newUser.email = req.body.email;
			newUser.role = req.body.role ? req.body.role : 'user';
			newUser.save((errSave) => {
				if (errSave) {
					res.send(errSave);
				}
				res.json({ newUser });
			});
		}
		return res.json({ err: true, message: 'user already exist' });
	});
});

// ********************* ALBUM SECTION ***************
// Add Album
// adding the /album/add route to our /api router
router.route('/album/add').post((req, res) => {
	User.findOne({ name: req.body.name }, (err, album) => {
		if (err) { return err; }
		if (!album) {
			const newAlbum = new Album();
			newAlbum.name = req.body.name;
			newAlbum.save((errSave) => {
				if (errSave) {
					res.send(errSave);
				}
				res.json({ newAlbum });
			});
		}
		return res.json({ err: true, message: 'album already exist' });
	});
});
