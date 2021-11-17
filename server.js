-require('dotenv').config();
const express = require('express');
const path = require('path');

const viewRoute = require('./routes/view_route');
const { register, login } = require('./controllers/users');
const userRoute = require('./routes/users');
// const tournamentRoute = require('./routes/tournament');
// const teamRoute = require('./routes/team');
const app = express();

app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, './static')));
// app.use('/api', tournamentRoute);
// app.use('/api', );

app.use('/', viewRoute);
app.use('/', userRoute);

// app.post('/', (req, res) => {
// 	console.log(req.body.email);
// });

app.listen(process.env.DATABASE_LISTEN, () => {
	console.log('Listening to port:', process.env.DATABASE_LISTEN);
});
