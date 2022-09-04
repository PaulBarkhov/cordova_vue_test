const express = require('express');
const mysql = require('mysql');
const app = express();
const path = __dirname + '/dist/';
app.use(express.static(path));
app.use(express.json());

const connection = mysql.createPool({
	connectionLimit: 10,
	host: process.env.MYSQL_HOST || 'localhost',
	user: process.env.MYSQL_USER || 'root',
	password: process.env.MYSQL_PASSWORD || 'password',
	database: process.env.MYSQL_DATABASE || 'test'
});

app.get('/', (req, res) => {
	res.sendFile(path + "index.html");
});

// app.get('/get', (req, res) => {
// 	connection.query('SELECT * FROM Test_table', (err, rows) => {
// 		if (err) {
// 			res.json({
// 				success: false,
// 				err
// 			});
// 		}
// 		else {
// 			res.json({
// 				success: true,
// 				rows
// 			});
// 		}
// 	});
// });

app.get('/todos', (req, res) => {
	connection.query('SELECT * FROM Todos', (err, data, fields) => {
		if (err) {
			res.status(500).json({
				success: false,
				err,
				todos: []
			});
		}
		else {
			res.json({
				success: true,
				todos: data
			});
		}
	})
})


app.post('/todos', (req, res) => {
	query = `INSERT INTO Todos(todo_content, todo_done) VALUES(?)`
	values = [
		req.body.todo_content,
		req.body.todo_done
	]
	connection.query(query, [values], (err, data) => {
		if (err) {
			res.json({
				success: false,
				err
			});
		}
		else {
			res.json({
				success: true
			});
		}
	})
})

app.listen(80, () => console.log('listining on port 80'));
