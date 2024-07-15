// import { openDb } from "./configDB.js";
import { createTable, insertPerson } from "./controller.js/person.js";
import express from "express";
const app = express();
app.use(express.json());

createTable();

app.get("/", (req, res) => {
  res.send("ok");
});

app.post("/cadastro", (req, res) => {
  insertPerson(req.body);
  res.json({
    statusCode: 200,
  });
});

app.listen(3000, () => console.log("Api rondando.."));
