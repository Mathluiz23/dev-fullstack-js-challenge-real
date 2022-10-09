const express = require("express");
let database = require("./database");
const cors = require("cors");
const knex = require("knex");
console.log(database);
const knexConfigFile = require("../knexfile");
const app = express();

app.use(cors());
app.database = knex(knexConfigFile.test);
app.use(express.json());

app.get("/students/list/:searchQuery?", (req, res) => {
	let result = database;
	let search = req.params.searchQuery;

	if (search) {
		search = search.toLowerCase();
		result = result.filter((student) => {
			console.log(student.nome.toLowerCase().includes(search));
			return (
				student.ra === search ||
				student.nome.toLowerCase().includes(search) === true ||
				student.cpf === search
			);
		});
	}

	return app
		.database("students")
		.select()
		.then((data) => {
			console.log(data);
			res.send(data);
		});
});

app.get("/students/find/:ra", (req, res) => {
	return app
		.database("students")
		.select()
		.where({ ra: req.params.ra })
		.first()
		.then((response) => {
			console.log(response);
			res.send(response);
		});
});

app.put("/students/editstudent/:ra", async (req, res) => {
	const userFound = await app
		.database("students")
		.select()
		.where({ ra: req.params.ra })
		.first();

	if (!userFound) {
		return res.status(400).send({
			result: false,
			message: "O estudante informado não existe",
		});
	}

	if (userFound) {
		const studentUpdate = await app
			.database("students")
			.update({
				email: req.body.email,
				nome: req.body.name,
			})
			.where({
				ra: req.params.ra,
			});

		if (studentUpdate) {
			res.send({
				result: true,
				message: `O estudante ${req.body.name} foi atualizado com sucesso`,
			});
		} else {
			res.status(500).send({
				result: false,
				message: "Não foi possível atualizar o estudante",
			});
		}
	}
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
