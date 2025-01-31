// import { openDb } from "./configDB.js";
import {
  createTable,
  insertPerson,
  showAllPersons,
  showSpecificPerson,
  updatePerson,
} from "./controller.js/person.js";
import express from "express";
const app = express();
app.use(express.json());

createTable();

app.get("/", (req, res) => {
  res.send("ok");
});

app.get("/persons", async (req, res) => {
  try {
    const persons = await showAllPersons();
    res.json(persons);
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: error,
    });
  }
});

app.get("/person", async (req, res) => {
  const { id } = req.body;
  const person = await showSpecificPerson(id);
  if (!id || !person) {
    res.json({
      statusCode: 400,
      message: "Informe ID",
    });
  } else {
    res.json(person);
  }
});

app.post("/cadastro", (req, res) => {
  const { name, number } = req.body;
  if (!name || !number) {
    res.json({
      statusCode: 400,
      message: "Compre ou reserve um numero, informe nome e telefone",
    });
  } else {
    insertPerson(req.body);
    res.json({
      statusCode: 200,
    });
  }
});

app.put("/cadastro", (req, res) => {
  if (req.body && !req.body.id) {
    res.json({
      statusCode: 400,
      message: "Você precisa informar o ID",
    });
  } else {
    updatePerson(req.body);
    res.json({
      statusCode: 200,
    });
  }
});

app.listen(3000, () => console.log("Api rondando.."));
