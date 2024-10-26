// src/components/ResponsibilityForm.js
import React, { useState } from 'react';
import axios from 'axios';

const ResponsibilityForm = ({ partyId }) => {
  const [name, setName] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:5000/api/parties/${partyId}/responsibilities`, {
      name,
      assignedTo
    })
      .then((response) => {
        console.log("Responsibility added:", response.data);
        setName("");
        setAssignedTo("");
      })
      .catch((error) => {
        console.error("There was an error adding the responsibility!", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Responsabilitate:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Asignat către:</label>
        <input type="text" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} required />
      </div>
      <button type="submit">Adaugă</button>
    </form>
  );
};

export default ResponsibilityForm;
