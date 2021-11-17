const bcrypt = require('bcryptjs');
const connection = require('../database/db');

exports.register = async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	const confirmpassword = req.body.confirmpassword;
	const firstname = req.body.firstname;
	const lastname = req.body.lastname;

	// checks if the fields are filled
	if (email && password && confirmpassword && firstname && lastname) {
		// checks if the password is the same with the confirm password
		if (password === confirmpassword) {
			// hash the password for secure password
			const hashedpassword = bcrypt.hashSync(req.body.password, 12);

			connection.query(
				'INSERT INTO users (email, pass, firstname, lastname) VALUES (?, ?, ?, ?)',
				[email, hashedpassword, firstname, lastname],
				(err, results, fields) => {
					if (err) {
						res.status(400).json({ msg: 'Something went wrong' });
						console.log(err);
					} else {
						res.redirect('/');
					}
				}
			);
		} else {
			res.status(400).json({ msg: 'Passwords do not match' });
			res.end();
		}
	} else {
		res.send('Please fill all the fields!');
		res.end();
	}
};

exports.login = (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	if (email && password) {
		connection.query(
			'SELECT * FROM users WHERE email = ?',
			[email],
			(err, results, fields) => {
				// checks if user exist and hashedpassword is the same value as the inputed password
				if (
					results.length &&
					bcrypt.compareSync(password, result[0].password)
				) {
					if (result[0].facilitator === 1) {
						req.session.loggedin = true;
						req.session.email = result[0].email;
						req.session.firstname = result[0].firstname;
						req.session.lastname = result[0].lastname;
						req.session.role = result[0].facilitator;
					} else {
						req.session.loggedin = true;
						req.session.email = result[0].email;
						req.session.firstname = result[0].firstname;
						req.session.lastname = result[0].lastname;
					}

					res.redirect('home');
				} else {
					res.send('Wrong Email and/or Password');
					res.end();
				}
				res.end();
			}
		);
	} else {
		res.send('Please enter Email and/or Password!');
		res.end();
	}
};
