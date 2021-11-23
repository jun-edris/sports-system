const express = require('express');
const { register, login } = require('../controllers/users');
const {
	loginValidation,
	registerValidation,
} = require('./../schema/validation');
const { emailExist } = require('./../middlewares/util');
const router = express.Router();
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

router.post('/', loginValidation, login);
router.post('/register', registerValidation, emailExist, register);

module.exports = router;
