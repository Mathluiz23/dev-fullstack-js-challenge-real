const express = require('express');
const database = require("./database")
const cors = require('cors');
console.log(database)


const app = express();


app.use(cors());

app.use(express.json());




app.get("/students/list", (req, res) => {
  res.send(database);
})

app.get("/students/find/:ra", (req, res) => {
  const studentsFound = database.find((student) => {
    return student.ra === req.params.ra;
  });

  res.send(studentsFound);
})

app.listen(3000);
console.log("Server is running...")

module.exports = app;