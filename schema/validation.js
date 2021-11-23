const { check } = require('express-validator');

exports.loginValidation = [
	check('email', 'Invalid email').isEmail().trim(),
	check('pass', 'Password must be 6 or more characters').not().isEmpty(),
];

exports.registerValidation = [
	check('firstname', 'Please input a valid name').isString().notEmpty(),
	check('lastname', 'Please input a valid name').isString().notEmpty(),
	check('email', 'Please include a valid email').isEmail().trim(),
	check('password', 'Password must be 6 or more characters').isLength({
		min: 4,
	}),
	check(
		'confirmpassword',
		'Password confirmation does not match password'
	).custom((value, { req }) => {
		return value === req.body.password;
	}),
];
