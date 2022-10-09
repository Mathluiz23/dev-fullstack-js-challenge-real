module.exports = class studentController {
	constructor(app) {
		this.app = app;
	}

	listAction = async (req, res) => {
		let query = this.app.database("students");
		let search = req.params.searchQuery;

		if (search) {
			query
				.where("ra", search)
				.orWhere("nome", "like", `%${search}%`)
				.orWhere("cpf", search);
		}

		return query.select().then((data) => {
			res.send(data);
		});
	};

	findAction = (req, res) => {
		return this.app
			.database("students")
			.select()
			.where({ ra: req.params.ra })
			.first()
			.then((response) => {
				console.log(response);
				res.send(response);
			});
	};

	isCreateDataValid = async (data) => {
		if (data.name == "") {
			return "O nome é um campo obrigatório";
		}

		if (data.email == "") {
			return "O email é um campo obrigatório";
		}

		if (data.cpf == "") {
			return "O CPF é um campo obrigatório";
		}

		if (data.ra == "") {
			return "O RA é um campo obrigatório";
		}

		if (parseInt(data.ra) != data.ra) {
			return "O RA deve ser um número";
		}

		if (parseInt(data.cpf) != data.cpf) {
			return "O CPF deve ser somente números";
		}

		const userExist = await this.app
			.database("students")
			.select()
			.where({
				ra: data.ra,
			})
			.first();

		if (userExist) {
			return "Usuário com RA já cadastrado";
		}

		return true;
	};

	createAction = async (req, res) => {
		const dataValid = await this.isCreateDataValid(req.body);

		if (dataValid != true) {
			return res.status(400).send({
				result: false,
				message: dataValid,
			});
		}

		return this.app
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
						message: `Estudante cadastrado com sucesso`,
					});
				} else {
					res.status(500).send({
						result: true,
						message: `Não foi possível cadastrar o estudante`,
					});
				}
			});
	};

	isEditDataValid = async (data) => {
		if (data.name == "") {
			return "O nome é um campo obrigatório";
		}

		if (data.email == "") {
			return "O email é um campo obrigatório";
		}
		return true;
	};

	editAction = async (req, res) => {
		const isEditDataValid = await this.isEditDataValid(req.body);

		if (isEditDataValid != true) {
			return res.status(400).send({
				result: false,
				message: isEditDataValid,
			});
		}

		const userFound = await this.app
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
			const studentUpdate = await this.app
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
	};

	deleteAction = (req, res) => {
		return this.app
			.database("students")
			.where({
				ra: req.params.ra,
			})
			.del()
			.then((response) => {
				if (response) {
					res.send({
						result: true,
						message: `O estudante foi excluído com sucesso`,
					});
				} else {
					res.send({
						result: false,
						message: `Não foi possível excluir o estudante`,
					});
				}
			});
	};
};
