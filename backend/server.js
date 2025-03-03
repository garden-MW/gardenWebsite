
import express from "express";
import cors from "cors";
import db from "./database.js"

const PORT = process.env.PORT || 5001;
const app = express();

// Middleware
/*
these are Express functions that run between
the time the server receives a request and
the time it sends a response.

app.use(cors()): by default browsers prevent
    requests from one domain, like the frontend
    on the localhost:3000, from making API calls 
    to another domain (Express backend localhost:5000).
    So this lets the react front end to fetch data
    from the Express backend without block. cors() is also
    needed
app.use(express.json()): parses JSON request bodies so that
    req.body contains JS objects. This is needed for when frontend
    sends data via fetch(), the request body is sent as a raw JSON
    text and by default Express doesnt understand JSON
*/
app.use(cors());
app.use(express.json());

//get plants
app.get("/plants", (req, res) => {                          // defines GET route at /plants
    db.all("SELECT * FROM plants", [], (err, rows) => {     // fetches all records from the plants table
        if (err) {
            res.status(500).json({error: err.message});     // if error
            return;
        }
        res.json(rows);                                     // if success, responds with JSON array of all plants

    });
});

//get plant by id
app.get("/plants/:id", (req,res) => {
    const { id } = req.params;                                          // extracts the plant ID from URL
    db.get("SELECT * FROM plants WHERE id = ?", [id], (err, row) => {   // retrieves plant with given id
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(row);                              // json obj, otherwise null
  });
});

// add plant
app.post("/plants", (req, res) => {
    const { name, type, water_frequency } = req.body;                       // reads plant details fron the request (sent as JSON)
    db.run(
      "INSERT INTO plants (name, type, water_frequency) VALUES (?, ?, ?)",  // inserts the new plant into the table, ? placeholders prevent sql injection attacks
      [name, type, water_frequency],
      function (err) {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({ id: this.lastID, name, type, water_frequency });         //new plants id and details
      }
    );
  });

// update plant by id 
app.put("/plants/:id", (req, res) => {
const { id } = req.params;
const { name, type, water_frequency } = req.body;                           //contains new data
db.run(
    "UPDATE plants SET name = ?, type = ?, water_frequency = ? WHERE id = ?", //modifies existing record
    [name, type, water_frequency, id],
    function (err) {
    if (err) {
        res.status(500).json({ error: err.message });
        return;
    }
    res.json({ message: "Plant updated successfully!" });                   //success message
    }
);
});

//delete plant
app.delete("/plants/:id", (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM plants WHERE id = ?", [id], function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: "Plant deleted successfully!" });
    });
  });

//start the server
app.listen(PORT, () => {                                        // starts server and listens for requests
console.log(`Server is running at http://localhost:${PORT}`);
});
//server runs until manually stopped

//confirms the backend is running in browser
app.get("/", (req, res) => {
  res.send("Server is running!");
});

//API Route so frontend can send plant data dynamically

app.post("/plants", (req, res) => {
  const {name, type, water_frequency} = req.body;

  db.run(
    "INSERT INTO plants (name, type, water_frequency) VALUES (?, ?, ?)",
    [name, type, water_frequency],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, name, type, water_frequency });
    }
  );
});