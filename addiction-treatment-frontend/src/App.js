import React, { useEffect, useState } from 'react';
import Header from './components/header';
import Map from './components/map';
import CenterList from './components/centerlist';
import axios from 'axios';

const App = () => {
  const [centers, setCenters] = useState([]);
  const [filteredCenters, setFilteredCenters] = useState([]);
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);

  // Fetch all treatment centers from the backend
  useEffect(() => {
    axios
      .get('http://localhost:5000/treatment-centers')
      .then((response) => {
        setCenters(response.data);
      })
      .catch((error) => {
        console.error('Error fetching treatment centers:', error);
        setError('Unable to fetch treatment centers. Please try again later.');
      });
  }, []);

  // Handle location search
  const handleSearch = async () => {
    if (!address) {
      setError('Please enter a location.');
      return;
    }
    try {
      // Get coordinates for the address
      const response = await axios.post('http://localhost:5000/getCoordinates', { address });
      const { lat, lng } = response.data;

      // Filter centers based on coordinates (e.g., within 50 km radius)
      const filtered = centers.filter((center) => {
        if (center.lat && center.lng) {  // Ensure lat/lng are not null
          const distance = calculateDistance(lat, lng, center.lat, center.lng);
          return distance <= 50; // Adjust radius as needed
        }
        return false;
      });

      setFilteredCenters(filtered);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      setError('Unable to find the location. Please try again.');
    }
  };

  // Helper function to calculate distance between two points (Haversine formula)
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  return (
    <div className="app">
      <Header />
      <main className="p-4">
        <div className="search-bar mb-6">
          <input
            type="text"
            placeholder="Enter location"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded mt-2">
            Search
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <Map centers={filteredCenters} />
        <CenterList centers={filteredCenters} />
      </main>
    </div>
  );
};

export default App;
