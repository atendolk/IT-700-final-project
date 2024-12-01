const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config(); // For environment variables like API_KEY and DB credentials

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const API_KEY = 'c9567156fd4b439a9e09a9ca8197f360'; // OpenCage API Key

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost', // Change to your database host
  user: 'root',      // Your database username
  password: 'Mataji12apt!',      // Your database password
  database: 'addiction_treatment', // Your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to the database');
});

// Endpoint to get treatment centers
app.get('/treatment-centers', (req, res) => {
  const query = 'SELECT * FROM treatment_centers';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching treatment centers:', err);
      res.status(500).send('Error retrieving data from the database');
    } else {
      res.json(results);
    }
  });
});

// Endpoint to get geocode (lat, lng) from address
app.post('/getCoordinates', async (req, res) => {
  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ error: 'Address is required' });
  }

  try {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${API_KEY}`
    );

    const data = response.data;
    if (data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry;
      res.json({ lat, lng });
    } else {
      res.status(404).json({ error: 'Address not found' });
    }
  } catch (error) {
    console.error('Error fetching data from OpenCage API:', error);
    res.status(500).json({ error: 'Error fetching data from OpenCage API' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
