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
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

router.get('/', index);
router.get('/register', register);
router.get('/tournament', tournament);
router.get('/users', users);
router.get('/sport', sport);
router.get('/dashboard', dashboard);

module.exports = router;
