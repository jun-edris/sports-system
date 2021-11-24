const express = require('express');
const {
	index,
	tournament,
	users,
	sport,
	dashboard,
	register,
} = require('../controllers/view');
const router = express.Router();

const app = express();
const { checkLoggedIn, checkLoggedOut } = require('./../middlewares/util');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

router.get('/', checkLoggedOut, index);
router.get('/register', checkLoggedOut, register);
router.get('/tournament', checkLoggedIn, tournament);
router.get('/users', checkLoggedIn, users);
router.get('/sport', checkLoggedIn, sport);
router.get('/dashboard', checkLoggedIn, dashboard);

module.exports = router;
