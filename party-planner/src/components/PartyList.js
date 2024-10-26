// src/components/PartyList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PartyList = () => {
  const [parties, setParties] = useState([]);

  useEffect(() => {
    // Obține lista petrecerilor de la server
    axios.get('http://localhost:5000/api/parties')
      .then((response) => {
        setParties(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the parties!", error);
      });
  }, []);

  return (
    <div>
      <h2>Lista Petrecerilor</h2>
      {parties.length === 0 ? (
        <p>Nu există petreceri disponibile.</p>
      ) : (
        <ul>
          {parties.map((party) => (
            <li key={party._id}>
              <Link to={`/party/${party._id}`}>
                {party.title} - {new Date(party.date).toLocaleDateString()}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PartyList;
