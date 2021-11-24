const express = require('express');
const connection = require('../database/db');
const { validationResult } = require('express-validator');
const {
	hashPassword,
	verifyPassword,
	createToken,
} = require('./../middlewares/util');
const cookieParser = require('cookie-parser');
const jwtDecode = require('jwt-decode');

const app = express();

app.use(cookieParser());

const alphaNumeric = '/^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/';

exports.register = async (req, res) => {
	try {
		const email = req.body.email;
		const password = req.body.password;
		const confirmpassword = req.body.confirmpassword;
		const firstname = req.body.firstname;
		const lastname = req.body.lastname;

		// checks if the names are only alphanumeric
		if (!firstname.match(alphaNumeric) || !lastname.match(alphaNumeric)) {
			return res.status(400).send({
				msg: 'Your name should contain any special characters or numbers',
			});
		}
		// checks if the fields have values
		if (!email || !password || !confirmpassword || !firstname || !lastname) {
			return res.status(400).send({
				msg: 'Please fill all the fields',
			});
		}
		// checks if the passwords are equal
		if (password !== confirmpassword) {
			return res.status(400).send({
				msg: 'Passwords do not match',
			});
		}
		// hashes the password to secure the password
		const hashedPassword = await hashPassword(password);

		connection.query(
			'INSERT INTO users (email, pass, firstname, lastname) VALUES (?, ?, ?, ?)',
			[email, hashedPassword, firstname, lastname],
			(err, results, fields) => {
				if (err) {
					res.status(400).json({ msg: 'Something went wrong' });
					console.log(err);
				} else {
					res.redirect('/');
				}
			}
		);
	} catch (error) {
		console.log(err);
		return res.status(400).json({ message: 'Something went wrong.' });
	}
};

exports.login = async (req, res) => {
	try {
		const errorArr = [];
		let validationErrors = validationResult(req);

		if (!validationErrors.isEmpty()) {
			let errors = Object.values(validationErrors.mapped());
			errors.forEach((item) => {
				errorArr.push(item.msg);
			});
			req.flash('errors', errorArr);
			return res.redirect('/');
		}
		// const email = req.body.email;
		// const password = req.body.pass;

		// if (!email || !password) {
		// 	return res.status(400).send({
		// 		msg: 'Please fill all the fields',
		// 	});
		// }

		// connection.query(
		// 	'SELECT * FROM users WHERE email = ?',
		// 	[email],
		// 	async (err, results, fields) => {
		// 		// checks if user exist and hashedpassword is the same value as the inputed password

		// 		if (err) {
		// 			console.log(err);
		// 			return res.status(400).json({ message: 'Something went wrong.' });
		// 		}

		// 		const validPassword = await verifyPassword(password, results[0].pass);

		// 		if (validPassword) {
		// 			const { pass, ...rest } = results[0];
		// 			const userInfo = Object.assign({}, { ...rest });

		// 			const token = createToken(userInfo);

		// 			const decodedToken = jwtDecode(token);
		// 			const expiresAt = decodedToken.exp;

		// 			res.cookie('token', token, {
		// 				httpOnly: true,
		// 			});

		// 			req.session.userInfo = userInfo;
		// 			req.session.isAuthenticated = true;

		// 			// console.log(req.session.userInfo);
		// 			return res.redirect('/dashboard');
		// 		} else {
		// 			res.status(403).json({
		// 				message: 'Wrong email or password.',
		// 			});
		// 		}
		// 	}
		// );
	} catch (error) {
		console.log(err);
		return res.status(400).json({ message: 'Something went wrong.' });
	}
	// const email = req.body.email;
	// const password = req.body.password;

	// if (email && password) {
	// 	connection.query(
	// 		'SELECT * FROM users WHERE email = ?',
	// 		[email],
	// 		(err, results, fields) => {
	// 			// checks if user exist and hashedpassword is the same value as the inputed password
	// 			if (
	// 				results.length &&
	// 				bcrypt.compareSync(password, result[0].password)
	// 			) {
	// 				if (result[0].facilitator === 1) {
	// 					req.session.loggedin = true;
	// 					req.session.email = result[0].email;
	// 					req.session.firstname = result[0].firstname;
	// 					req.session.lastname = result[0].lastname;
	// 					req.session.role = result[0].facilitator;
	// 				} else {
	// 					req.session.loggedin = true;
	// 					req.session.email = result[0].email;
	// 					req.session.firstname = result[0].firstname;
	// 					req.session.lastname = result[0].lastname;
	// 				}

	// 				res.redirect('home');
	// 			} else {
	// 				res.send('Wrong Email and/or Password');
	// 				res.end();
	// 			}
	// 			res.end();
	// 		}
	// 	);
	// } else {
	// 	res.send('Please enter Email and/or Password!');
	// 	res.end();
	// }
};
