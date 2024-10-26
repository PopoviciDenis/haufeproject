// src/components/PartyDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importă useNavigate
import axios from 'axios';
import ResponsibilityForm from './ResponsibilityForm';

const PartyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Definește navigate
  const [party, setParty] = useState(null);
  const [responsibilities, setResponsibilities] = useState([]);

  const fetchPartyDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/parties/${id}`);
      setParty(response.data);
      const updatedResponsibilities = response.data.responsibilities.map(resp => ({
        ...resp,
        status: resp.status || 'pending'
      }));
      setResponsibilities(updatedResponsibilities);
    } catch (error) {
      console.error("There was an error fetching the party details!", error);
    }
  };

  useEffect(() => {
    fetchPartyDetails();
  }, [id]);

  const handleAddResponsibility = async (newResponsibility) => {
    try {
      await axios.post(`http://localhost:5000/api/parties/${id}/responsibilities`, newResponsibility);
      fetchPartyDetails();
    } catch (error) {
      console.error("Error adding responsibility:", error);
    }
  };

  if (!party) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={() => navigate(-1)}>Înapoi</button>
      <h2>{party.title}</h2>
      <p>Data: {new Date(party.date).toLocaleDateString()}</p>
      <p>Buget: {party.budget}</p>
      <h3>Responsabilități</h3>
      <ul className="responsibility-list">
        {responsibilities
          .filter(resp => resp.name && resp.assignedTo) // Filtrează responsabilitățile incomplete
          .map((resp, index) => (
            <li key={index}>
              {resp.name} - {resp.assignedTo} (Status: {resp.status || 'pending'})
            </li>
          ))}
      </ul>
      <ResponsibilityForm partyId={id} onAddResponsibility={handleAddResponsibility} />
    </div>
  );
};

export default PartyDetails;
