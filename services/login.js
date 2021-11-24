const connection = require('../database/db');
const { verifyPassword } = require('./../middlewares/util');

const handleLogin = async (email, password) => {
	return new Promise(async (resolve, reject) => {
		const user = await findUserByEmail(email);
		if (user) {
			await verifyPassword(password, user.pass).then((match) => {
				if (match) {
					resolve(true);
				} else {
					reject('Invalid password');
				}
			});
		} else {
			reject('The email does not exist');
		}
	});
};

const findUserByEmail = async (email) => {
	return new Promise((resolve, reject) => {
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
	});
};

const findUserById = async (id) => {
	return new Promise((resolve, reject) => {
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
		} catch (error) {
			reject(err);
		}
	});
};

module.exports = {
	handleLogin: handleLogin,
	findUserByEmail: findUserByEmail,
	findUserById: findUserById,
};
