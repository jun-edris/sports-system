exports.index = (req, res) => {
	res.render('index.ejs');
};
exports.register = (req, res) => {
	res.render('register.ejs');
};
exports.tournament = (req, res) => {
	res.render('tournament.ejs');
};
exports.users = (req, res) => {
	res.render('users.ejs');
};
exports.sport = (req, res) => {
	res.render('sport.ejs');
};
exports.dashboard = (req, res) => {
	res.render('dashboard.ejs', { errors: req.flash('errors') });
};
