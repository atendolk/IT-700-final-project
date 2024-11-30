const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// MySQL database connection setup
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to the database');
});

// Middleware
app.use(express.json()); // To parse JSON bodies

// Example route to fetch treatment centers
app.get('/treatment-centers', (req, res) => {
  const query = 'SELECT * FROM treatment_centers';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching treatment centers: ', err);
      return res.status(500).send('Error fetching data');
    }
    res.json(results); // Send results as JSON response
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
