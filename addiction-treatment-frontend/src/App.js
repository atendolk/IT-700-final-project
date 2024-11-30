import React, { useState } from 'react';
import axios from 'axios';
import Header from './components/header';
import Map from './components/map';
import CenterList from './components/centerlist';


const App = () => {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [centers, setCenters] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch latitude and longitude from backend
      const geoResponse = await axios.post('http://localhost:5000/getCoordinates', { address });
      setCoordinates(geoResponse.data);
      setError('');

      // Fetch treatment centers from backend based on coordinates
      if (geoResponse.data) {
        const { lat, lng } = geoResponse.data;
        const centersResponse = await axios.get('http://localhost:5000/treatment-centers', {
          params: { lat, lng }
        });
        setCenters(centersResponse.data);
      }
    } catch (err) {
      setError('Error fetching data');
      setCoordinates(null);
      setCenters([]);
    }
  };

  return (
    <div className="app">
      <Header />
      <div className="search-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter Address"
          />
          <button type="submit">Find Treatment Centers</button>
        </form>
      </div>

      {error && <p>{error}</p>}

      {coordinates && (
        <div>
          <h3>Coordinates:</h3>
          <p>Latitude: {coordinates.lat}</p>
          <p>Longitude: {coordinates.lng}</p>
        </div>
      )}

      <div className="map-and-list">
        <Map centers={centers} />
        <CenterList centers={centers} />
      </div>
    </div>
  );
};

export default App;
