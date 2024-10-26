// src/components/PartyList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PartyList = () => {
  const [parties, setParties] = useState([]);

  useEffect(() => {
    fetchParties();
  }, []);

  const fetchParties = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/parties');
      setParties(response.data);
    } catch (error) {
      console.error("There was an error fetching the parties!", error);
    }
  };

  const handleDeleteParty = async (id) => {
    const confirmDelete = window.confirm('Sigur dorești să ștergi acest eveniment?');
    if (!confirmDelete) return;
  
    try {
      console.log(`Attempting to delete party with ID: ${id}`); // Debug
      await axios.delete(`http://localhost:5000/api/parties/${id}`);
      fetchParties(); // Actualizează lista după ștergere
    } catch (error) {
      console.error("Eroare la ștergerea evenimentului!", error);
    }
  };
  

  return (
    <div>
      <h2>Lista Evenimentelor</h2>
      <ul>
        {parties.map((party) => (
          <li key={party._id}>
            <Link to={`/party/${party._id}`}>{party.title}</Link>
            <button onClick={() => handleDeleteParty(party._id)} style={{ marginLeft: '10px', color: 'red' }}>
              Șterge
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PartyList;
