// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      console.log("Registration response:", response.data); // Debug: check response
      navigate('/login'); // Redirect to login on success
    } catch (error) {
      console.error("Registration error:", error.response?.data?.message || error.message);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <h2>Înregistrare</h2>
      <input type="text" name="firstName" placeholder="Nume" onChange={handleChange} required />
      <input type="text" name="lastName" placeholder="Prenume" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Parolă" onChange={handleChange} required />
      <button type="submit">Înregistrează-te</button>
      <p>Ai deja un cont? <Link to="/login">Autentifică-te aici</Link></p> {/* Link către login */}
    </form>
  );
};

export default Register;
