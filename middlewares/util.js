const jwt = require('express-jwt');
const Jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.attachUser = (req, res, next) => {
	const token = req.cookies.token;

	if (!token) {
		return res.status(401).json({ message: 'Authentication Invalid' });
	}

	const decodedToken = jwtDecode(token);

	if (!decodedToken) {
		return res
			.status(401)
			.json({ message: 'There was a problem in authorizing the request' });
	} else {
		req.user = decodedToken;
		next();
	}
};

exports.requireUser = (req, res, next) => {
	if (!req.user) {
		return res.status(401).json({
			message: 'There was a problem authorizing the request',
		});
	}
	next();
};

// to check if the inputed email is already exist in the database
exports.emailExist = (req, res, next) => {
	connection.query(
		'SELECT * FROM users WHERE email = ?',
		[email],
		(err, results, fields) => {
			if (err) {
				res.status(400).json({ msg: 'Something went wrong' });
				console.log(err);
			}
			if (results.length) {
				res.status(400).json({ msg: 'The email is already registered!' });
				console.log(err);
			} else {
				next();
			}
		}
	);
};

exports.createToken = (user) => {
	// Sign the JWT
	if (!user.user_id) {
		throw new Error('No user id specified');
	}

	return Jwt.sign(
		{
			sub: user.user_id,
			email: user.email,
			role: user.admin == 1 ? 'admin' : 'user',
			firstName: user.firstName,
			lastName: user.lastName,
			iss: 'api.sportsbracketing',
			aud: 'api.sportsbracketing',
		},
		process.env.JWT_SECRET_KEY,
		{ algorithm: 'HS256', expiresIn: '5h' }
	);
};

exports.hashPassword = (password) => {
	return new Promise((resolve, reject) => {
		// Generate a salt at level 12 strength
		bcrypt.genSalt(12, (err, salt) => {
			if (err) {
				reject(err);
			}
			bcrypt.hash(password, salt, (err, hash) => {
				if (err) {
					reject(err);
				}
				resolve(hash);
			});
		});
	});
};

exports.verifyPassword = (passwordAttempt, hashedPassword) => {
	return new Promise(async (resolve, reject) => {
		try {
			await bcrypt.compare(passwordAttempt, hashedPassword).then((match) => {
				if (match) {
					resolve(true);
				} else {
					resolve(`The password that you've entered is incorrect`);
				}
			});
		} catch (error) {
			reject(error);
		}
	});
};

exports.checkLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated) {
		return res.redirect('/');
	}
	next();
};
exports.checkLoggedOut = (req, res, next) => {
	if (req.isAuthenticated) {
		return res.redirect('/dashboard');
	}
	next();
};

exports.checkJwt = jwt({
	secret: process.env.JWT_SECRET_KEY,
	algorithms: ['HS256'],
	issuer: 'api.livescoring',
	audience: 'api.livescoring',
	getToken: (req) => req.cookies.token,
});
