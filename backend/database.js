import sqlite3Pkg from "sqlite3"
const sqlite3 = sqlite3Pkg.verbose(); //imports package so node.js can interact with sqlite database

//create/connect to sqlite database
// opens the database test.db, this db will store the data persistently

const db = new sqlite3.Database("./garden.db", (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Connected to SQLite database.");
    }
});

export default db;
