const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

const data = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 22 },
  { name: "David", age: 28 },
  { name: "Eve", age: 35 },
];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/people", (req, res) => {
  res.send(data);
});

app.get("/people/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (id >= 0 && id < data.length) {
    res.send(data[id]);
  } else {
    res.status(404).send("Person not found");
  }
});

app.delete("/people/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (id >= 0 && id < data.length) {
    data.splice(id, 1);
    res.send(data);
  } else {
    res.status(404).send("Person not found");
  }
});

app.post("/people", (req, res) => {
  const person = req.body;
  if (person.name && person.age) {
    data.push(person);
    res.send(person);
  } else {
    res.status(400).send("Invalid data");
  }
});

app.listen(port, () => {
  console.log("Server running on " + port);
});
