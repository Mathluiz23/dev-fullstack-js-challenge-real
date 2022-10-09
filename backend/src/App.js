const express = require("express");
const cors = require("cors");
const knex = require("knex");
const knexConfigFile = require("../knexfile");
const app = express();
const studentsRoutes = require("./routes/studentsRoutes");

app.use(cors());
app.database = knex(knexConfigFile.test);
app.use(express.json());

app.use("/students", studentsRoutes(app));

app.listen(3000);
console.log("Server is running...");

module.exports = app;
