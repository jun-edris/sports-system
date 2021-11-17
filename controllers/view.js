exports.index = (req, res) => {
	res.render('index.ejs');
};
exports.register = (req, res) => {
	res.render('register.ejs');
};
exports.tournament = (req, res) => {
	if (!req.session.loggedin) {
		res.redirect('/');
	} else {
		res.render('tournament.ejs');
	}
};
exports.users = (req, res) => {
	res.render('users.ejs');
};
exports.sport = (req, res) => {
	res.render('sport.ejs');
};
exports.dashboard = (req, res) => {
	console.log(req.session);
	// if (req.session) {
	// 	res.render('dashboard.ejs');
	// } else {
	// 	res.redirect('index');
	// }
};
