const express = require('express');
const database = require("./database")
const cors = require('cors');
console.log(database)


const app = express();


app.use(cors());

app.use(express.json());




app.get("/students/list", (req, res) => {
  setTimeout(()=> {
    res.send(database);
  }, 2000);
// after 2 seconds get a database, simulation bd request 
})

app.get("/students/find/:ra", (req, res) => {
  const studentsFound = database.find((student) => {
    return student.ra === req.params.ra;
  });

  setTimeout(() => {
    res.send(studentsFound);
  }, 2000)
})

app.listen(3000);
console.log("Server is running...")

module.exports = app;