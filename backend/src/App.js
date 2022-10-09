const express = require("express");
const cors = require("cors");
const knex = require("knex");
const knexConfigFile = require("../knexfile");
const app = express();
const studentsController = require("./controllers/studentController");

app.use(cors());
app.database = knex(knexConfigFile.test);
app.use(express.json());

const studentsControllerInstance = new studentsController(app);

app.get("/students/list/:searchQuery?", studentsControllerInstance.listAction);

app.get("/students/find/:ra", studentsControllerInstance.findAction);

app.put("/students/editstudent/:ra", studentsControllerInstance.editAction);

app.delete("/students/delete/:ra", studentsControllerInstance.deleteAction);

app.post("/students/newstudent", studentsControllerInstance.createAction);

app.listen(3000);
console.log("Server is running...");

module.exports = app;
