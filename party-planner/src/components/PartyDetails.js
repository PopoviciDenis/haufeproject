// src/components/PartyDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ResponsibilityForm from './ResponsibilityForm';

const PartyDetails = () => {
  const { id } = useParams();
  const [party, setParty] = useState(null);

  useEffect(() => {
    // Obține detaliile unei petreceri
    axios.get(`http://localhost:5000/api/parties/${id}`)
      .then((response) => {
        setParty(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the party details!", error);
      });
  }, [id]);

  if (!party) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{party.title}</h2>
      <p>Data: {new Date(party.date).toLocaleDateString()}</p>
      <p>Buget: {party.budget}</p>
      <h3>Responsabilități</h3>
      <ul>
        {party.responsibilities.map((resp, index) => (
          <li key={index}>
            {resp.name} - {resp.assignedTo} (Status: {resp.status})
          </li>
        ))}
      </ul>
      <ResponsibilityForm partyId={id} />
    </div>
  );
};

export default PartyDetails;
