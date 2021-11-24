const passportLocal = require('passport-local');
const passport = require('passport');
const { findUserByEmail, findUserById } = require('../services/login');
const { verifyPassword } = require('./../middlewares/util');
const LocalStrategy = passportLocal.Strategy;

exports.initPassportLocal = () => {
	passport.use(new LocalStrategy(
			{
				usernameField: 'email',
				passwordField: 'pass',
				passReqToCallback: true,
			},
			async (req, email, password, done) => {
				try {
					await findUserByEmail(email).then(async (user) => {
						if (!user) {
							return done(
								null,
								false,
								req.flash('errors', `This user email "${email}" doesn't exist`)
							);
						}
						if (user) {
							const match = await verifyPassword(password, user.pass);
							if (match === true) {
								return console.log(done(null, user, null));
							} else {
								return done(null, false, req.flash('errors', match));
							}
						}
					});
				} catch (err) {
					console.log(err);
					return done(null, false, { message: err });
				}
			}
		)
	);
};

passport.serializeUser((user, done) => {
	done(null, user.user_id);
});

passport.deserializeUser((id, done) => {
	findUserById(id)
		.then((user) => {
			return done(null, user);
		})
		.catch((error) => {
			return done(error, null);
		});
});
