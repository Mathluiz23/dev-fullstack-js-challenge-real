const express = require("express");
const studentsController = require("../controllers/studentController");

module.exports = (app) => {
	const router = express.Router();
	const studentsControllerInstance = new studentsController(app);

	router.get("/list/:searchQuery?", studentsControllerInstance.listAction);

	router.get("/find/:ra", studentsControllerInstance.findAction);

	router.delete("/delete/:ra", studentsControllerInstance.deleteAction);

	router.post("/newstudent", studentsControllerInstance.createAction);
	router.put("/editstudent/:ra", studentsControllerInstance.editAction);

	return router;
};
