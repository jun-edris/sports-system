const mysql = require('mysql');
const connection = mysql.createConnection({
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE,
	port: process.env.DATABASE_PORT,
	connectionLimit: 10,
});

connection.connect(function (error) {
	if (error) {
		console.log(error);
	} else {
		console.log('Connected!:)');
	}
});

module.exports = connection;
