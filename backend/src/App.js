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
	let query = app.database("students");
	let result = database;
	let search = req.params.searchQuery;

	if (search) {
		query
			.where("ra", search)
			.orWhere("nome", "like", `%${search}%`)
			.orWhere("cpf", search);
	}

	return query.select().then((data) => {
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
	if (req.body.name == "") {
		return res.status(400).send({
			result: false,
			message: "O nome é um campo obrigatório",
		});
	}

	if (req.body.email == "") {
		return res.status(400).send({
			result: false,
			message: "O email é um campo obrigatório",
		});
	}

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
	return app
		.database("students")
		.where({
			ra: req.params.ra,
		})
		.del()
		.then((response) => {
			if (response) {
				res.send({
					result: true,
					message: `O estudante ${req.params.ra} foi excluído com sucesso`,
				});
			} else {
				res.send({
					result: false,
					message: `Não foi possível excluir o estudante`,
				});
			}
		});
});

app.post("/students/newstudent", async (req, res) => {
	if (req.body.name == "") {
		return res.status(400).send({
			result: false,
			message: "O nome é um campo obrigatório",
		});
	}

	if (req.body.email == "") {
		return res.status(400).send({
			result: false,
			message: "O email é um campo obrigatório",
		});
	}

	if (req.body.cpf == "") {
		return res.status(400).send({
			result: false,
			message: "O CPF é um campo obrigatório",
		});
	}

	if (req.body.ra == "") {
		return res.status(400).send({
			result: false,
			message: "O RA é um campo obrigatório",
		});
	}

	if (parseInt(req.body.ra) != req.body.ra) {
		return res.status(400).send({
			result: false,
			message: "O RA deve ser um número",
		});
	}

	if (parseInt(req.body.cpf) != req.body.ra) {
		return res.status(400).send({
			result: false,
			message: "O CPF deve ser um número",
		});
	}

	const userExist = await app
		.database("students")
		.select()
		.where({
			ra: req.body.ra,
		})
		.first();

	if (userExist) {
		return res.status(400).send({
			result: false,
			message: "Usuário com RA já cadastrado",
		});
	}

	return app
		.database("students")
		.insert({
			nome: req.body.name,
			ra: req.body.ra,
			email: req.body.email,
			cpf: req.body.cpf,
		})
		.then((response) => {
			if (response) {
				res.send({
					result: true,
					message: `Aluno ${req.body.name} foi cadastrado com sucesso`,
				});
			} else {
				res.status(500).send({
					result: true,
					message: `Não foi possível cadastrar o estudante`,
				});
			}
		});
});

app.listen(3000);
console.log("Server is running...");

module.exports = app;
