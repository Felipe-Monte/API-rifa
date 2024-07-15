import { openDb } from "../configDB.js";

export async function createTable() {
  openDb().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS Person (id INTEGER PRIMARY KEY, name TEXT, number TEXT)"
    );
  });
}

export async function insertPerson(person) {
  openDb().then((db) => {
    db.run("INSERT INTO Person (name, number) VALUES (?,?)", [
      person.name,
      person.number,
    ]);
  });
}
