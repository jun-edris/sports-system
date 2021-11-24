-require('dotenv').config();
const express = require('express');
const path = require('path');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const viewRoute = require('./routes/view_route');
const userRoute = require('./routes/users');

const app = express();

app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(
	session({
		secret: process.env.DATABASE_LISTEN,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24,
		},
	})
);
app.use('/static', express.static(path.join(__dirname, './static')));

app.use('/', viewRoute);
app.use('/', userRoute);

app.listen(process.env.DATABASE_LISTEN, () => {
	console.log('Listening to port:', process.env.DATABASE_LISTEN);
});
