const express = require('express');
const { register, login } = require('../controllers/users');
const router = express.Router();
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

router.post('/', login);
router.post('/register', register);

module.exports = router;
