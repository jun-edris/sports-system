const express = require('express');
const { register, login } = require('../controllers/users');
const {
	loginValidation,
	registerValidation,
} = require('./../schema/validation');
const { emailExist } = require('./../middlewares/util');
const passport = require('passport');
const router = express.Router();
const app = express();

const {
	initPassportLocal,
} = require('./../controllers/passportLocalController');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

initPassportLocal();

router.post(
	'/',
	loginValidation,
	passport.authenticate('local', {
		successRedirect: '/dashboard',
		failureRedirect: '/',
		successFlash: true,
		failureFlash: true,
	})
);
router.post('/register', registerValidation, emailExist, register);

module.exports = router;
