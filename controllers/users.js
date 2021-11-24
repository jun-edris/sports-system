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
const { handleLogin } = require('../services/login');

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

		await handleLogin(req.body.email, req.body.pass);
		return res.redirect('/dashboard');
	} catch (err) {
		console.log(err);
		// req.flash('errors', err);
		// return res.status(400).json({ message: 'Something went wrong.' });
	}
};
