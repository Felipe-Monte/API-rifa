import { openDb } from "../configDB.js";

export async function createTable() {
  openDb().then((db) => {
    db.exec(
      `CREATE TABLE IF NOT EXISTS Person (
        id INTEGER PRIMARY KEY,
        name TEXT,
        number TEXT,
        is_valid BOOLEAN,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`
    );
  });
}

export async function showAllPersons() {
  const db = await openDb();
  return db.all("SELECT * FROM Person");
}

export async function insertPerson(person) {
  openDb().then((db) => {
    db.run("INSERT INTO Person (name, number, is_valid) VALUES (?,?,?)", [
      person.name,
      person.number,
      person.is_valid,
    ]);
  });
}

export async function updatePerson(person) {
  openDb().then((db) => {
    db.run("UPDATE Person SET name=?, number=?, is_valid=? WHERE id=?", [
      person.name,
      person.number,
      person.is_valid,
      person.id,
    ]);
  });
}
