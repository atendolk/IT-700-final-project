// centerlist.js
import React from 'react';

const CenterList = ({ centers, onSelect }) => {
  return (
    <div className="list-container">
      <h2 className="text-xl font-semibold mb-4">Treatment Centers Near You</h2>
      <ul className="space-y-3">
        {centers.map((center, idx) => (
          <li
            key={idx}
            className="bg-white p-4 shadow rounded-lg cursor-pointer hover:bg-blue-50"
            onClick={() => onSelect(center)}
          >
            <h3 className="text-lg font-semibold">{center.name}</h3>
            <p className="text-sm text-gray-600">{center.address}</p>
            <p className="text-sm text-blue-600">{center.contact}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CenterList;
