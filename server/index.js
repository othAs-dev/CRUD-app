const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const port = 3030;
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "employeeSystem",
});

// employees

// POST /employees
app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    "INSERT INTO employees (name, age, country, position, wage) VALUES (?, ?, ?, ?, ?)",
    [name, age, country, position, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted");
      }
    }
  );
});

// GET /employees
app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      res.status(500).send();
    } else {
      res.send(result);
    }
  });
});

// DELETE /employees/:id
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  let sql = `DELETE FROM employees WHERE id = ${id}`;

  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send();
    }
    res.status(204).send();
  });
});

// PUT /employees/:id
app.put("/employees/:id", (req, res) => {
  const { params, body } = req;
  const sqlQuery = `UPDATE employees SET name='${body.name}', age='${body.age}', country='${body.country}', position='${body.position}', wage=${body.wage} WHERE id=${params.id}`;

  db.query(sqlQuery, (err, results) => {
    if (err) {
      res.status(500).send();
    }

    res.json({ status: "ok" });
  });
});
