const express = require("express");
let database = require("./database");
const cors = require("cors");
console.log(database);

const app = express();

app.use(cors());

app.use(express.json());

app.get("/students/list", (req, res) => {
	setTimeout(() => {
		res.send(database);
	}, 1500);
	// after 2 seconds get a database, simulation bd request
});

app.get("/students/find/:ra", (req, res) => {
	const studentsFound = database.find((student) => {
		return student.ra === req.params.ra;
	});

	setTimeout(() => {
		res.send(studentsFound);
	}, 1500);
});

app.delete("/students/delete/:ra", (req, res) => {
	database = database.filter((student) => {
		return student.ra !== req.params.ra;
	});
	res.send({
		result: true,
		message: `O estudante ${req.params.ra} foi excluído com sucesso`,
	});
});

app.post("/students/newstudent", (req, res) => {
	console.log(req.body);
	database.push({
		nome: req.body.name,
		ra: req.body.ra,
		email: req.body.email,
		cpf: req.body.cpf,
	});
	res.send({
		result: true,
		message: `Aluno ${req.body.name} foi cadastrado com sucesso`,
	});
});

app.listen(3000);
console.log("Server is running...");

module.exports = app;
