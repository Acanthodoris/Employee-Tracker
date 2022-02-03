// packages needed
const fs = require('fs');
const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

// server/PORT
const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    multipleStatements: true
  },
  console.log(`Connected to the database.`)
);

const schema_query=fs.readFileSync("db/schema.sql", {
  encoding:"utf-8"
})
const seed_query=fs.readFileSync("db/seeds.sql", {
  encoding:"utf-8"
})

db.connect()
db.query(schema_query, err => {
  if (err) {
    console.log(err)
  }
})
db.query(seed_query, err => {
  if (err) {
    console.log(err)
  }
})

db.query("SELECT * FROM departments", function(err,data) {
  if (err) {
    console.log(err)
  }
  else{
    console.log(data);
  }
})

db.query("SELECT * FROM roles", function(err,data) {
  if (err) {
    console.log(err)
  }
  else{
    console.log(data);
  }
})

db.query("SELECT * FROM employees", function(err,data) {
  if (err) {
    console.log(err)
  }
  else{
    console.log(data);
  }
})
db.end()

// 404 error and live port call
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});