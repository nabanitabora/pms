const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3001; // Port for the backend server

// Path to your SQLite database
const dbPath = "C:/Users/DELL/Desktop/data(2).db";

// Middleware
app.use(cors());

// Basic root route
app.get("/", (req, res) => {
  res.send("Welcome to the backend server!");
});

app.post("/set-machine", (req, res) => {
  const { machine } = req.body;
  res.status(201).send(machine);
});

// Data endpoint
app.get("/api/data", (req, res) => {
  const { machine } = req.query;    
  console.log('machine: ', machine);
  console.log("Request received at /api/data--");

  // Get the current date
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  // Create the dynamic table name
  const tableName = `sensor_data_${day}${month}${year}`;

  // Modify the query to include the selected machine (if provided)
  const sqlAll = `SELECT * FROM ${tableName} WHERE esp_id LIKE '${machine}'`; // Default to 'D1' if no machine is provided
  const sqlEspId = `SELECT DISTINCT esp_id FROM ${tableName} WHERE esp_id LIKE 'D%'`;
  const sqlRejtd = `SELECT * FROM ${tableName} WHERE esp_id LIKE 'R${machine}'`;
  
  let db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error("Error opening database", err.message);
      res.status(500).json({ error: "Failed to connect to the database" });
      return;
    }
  });

  let data = [];
  let espids = [];
  let rejcted = [];
  
  // Fetch all data
  db.all(sqlAll, [], (err, rows) => {
    console.log(sqlAll, "queryyyyyyy");
    console.log(sqlRejtd, "queryyyyyyy");
    if (err) {
      res.status(500).json({ error: "Failed to fetch data" });
      return;
    }
    data = rows;

    // Fetch esp_id data
    db.all(sqlEspId, [], (err, rows) => {
      if (err) {
        res.status(500).json({ error: "Failed to fetch esp_id data" });
        return;
      }
      espids = rows.map((row) => row.esp_id);

      console.log(espids, "fetched mavjuyhtghjkujhghjkhghjkj00");
      // Respond with both data arrays
      // res.json({ data, espids });
    });

    db.all(sqlRejtd, [], (err, rows) => {
      if (err) {
        res.status(500).json({ error: "Failed to fetch esp_id data" });
        return;
      }
      rejcted = rows;

      console.log(rejcted, "rejected mavjuyhtghjkujhghjkhghjkj00");
      // Respond with both data arrays
      res.json({ data, espids, rejcted });
    });
  });

  db.close((err) => {
    if (err) {
      console.error("Error closing the database", err.message);
    }
  });
});


app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
