// import { openDb } from "./configDB.js";
import {
  createTable,
  insertPerson,
  updatePerson,
} from "./controller.js/person.js";
import express from "express";
const app = express();
app.use(express.json());

createTable();

app.get("/", (req, res) => {
  res.send("ok");
});

app.post("/cadastro", (req, res) => {
  const { name, number } = req.body;
  if (!name || !number ) {
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
