// src/components/CreateParty.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateParty = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [budget, setBudget] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/parties', {
        title,
        date,
        budget
      });
      navigate('/'); // Redirecționează către pagina principală după crearea evenimentului
    } catch (error) {
      console.error("Error creating party:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Creare Eveniment Nou</h2>
      <input
        type="text"
        placeholder="Titlul evenimentului"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="date"
        placeholder="Data"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Buget"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        required
      />
      <button type="submit">Creează Eveniment</button>
    </form>
  );
};

export default CreateParty;
