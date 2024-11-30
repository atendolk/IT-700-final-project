const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // For using environment variables (API Key)

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const API_KEY = 'c9567156fd4b439a9e09a9ca8197f360'; // Use the key you received

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
    res.status(500).json({ error: 'Error fetching data from OpenCage API' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
