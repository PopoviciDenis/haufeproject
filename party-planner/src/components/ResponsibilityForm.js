// src/components/ResponsibilityForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ResponsibilityForm = ({ partyId, onAddResponsibility }) => {
  const [name, setName] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Obține lista utilizatorilor pentru dropdown
    axios.get('http://localhost:5000/api/auth/users')
      .then((response) => {
        console.log("User data fetched:", response.data); // Debug: check the data
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);
  <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} required>
  <option value="">Selectează responsabilul</option>
  {users.map(user => (
    <option key={user._id} value={`${user.firstName} ${user.lastName}`}>
      {user.firstName} {user.lastName}
    </option>
  ))}
</select>


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newResponsibility = {
        name,
        assignedTo,
        status: 'pending'  // Setează status implicit
      };
      const response = await axios.post(`http://localhost:5000/api/parties/${partyId}/responsibilities`, newResponsibility);
      onAddResponsibility(response.data); // Trimite responsabilitatea nouă la PartyDetails
      setName("");
      setAssignedTo("");
    } catch (error) {
      console.error("Error adding responsibility:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="responsibility-form">
      <div>
        <label>Responsabilitate:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Asignat către:</label>
        <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} required>
          <option value="">Selectează responsabilul</option>
          {users.map(user => (
            <option key={user._id} value={`${user.firstName} ${user.lastName}`}>
              {user.firstName} {user.lastName}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Adaugă</button>
    </form>
  );
};

export default ResponsibilityForm;
