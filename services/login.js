const { resolve } = require('path/posix');
const connection = require('../database/db');
const {
	hashPassword,
	verifyPassword,
	createToken,
} = require('./../middlewares/util');

exports.handleLogin = async (email, password) => {
	const user = await findUserByEmail(email);
	if (user) {
		await verifyPassword(password, user.password).then((match) => {
			if (match) {
				resolve(true);
			} else {
				reject('Invalid password');
			}
		});
	} else {
		reject('The email does not exist');
	}
};

exports.findUserByEmail = async (email) => {
	try {
		connection.query(
			'SELECT * FROM `users` WHERE `email` = ?',
			email,
			(err, results) => {
				if (err) {
					reject(err);
				}
				const user = results[0];
				resolve(user);
			}
		);
	} catch (error) {
		reject(error);
	}
};

exports.findUserById = async (id) => {
	try {
		connection.query(
			'SELECT * FROM `users` WHERE `user_id` = ?',
			id,
			(err, results) => {
				if (err) {
					reject(err);
				}
				const user = results[0];
				resolve(user);
			}
		);
	} catch (error) {}
};
