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
const {
	isAuthenticated,
	isNotAuthenticated,
} = require('./../middlewares/util');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

router.get('/', isNotAuthenticated, index);
router.get('/register', isNotAuthenticated, register);
router.get('/tournament', isAuthenticated, tournament);
router.get('/users', isAuthenticated, users);
router.get('/sport', isAuthenticated, sport);
router.get('/dashboard', isAuthenticated, dashboard);

module.exports = router;
