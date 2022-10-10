require("dotenv").config();

module.exports = {
	test: {
		client: "mysql",
		connection: {
			host: "remotemysql.com",
			user: "982zYZykWO",
			password: process.env.DB_PASS,
			database: "982zYZykWO",
		},
		migratons: {
			directory: "migrations",
		},
	},
};
