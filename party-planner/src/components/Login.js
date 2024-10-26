import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      const { token, user } = response.data;
      console.log("Răspuns de la server la login:", response.data); // Debug
      localStorage.setItem('token', token);
      localStorage.setItem('userName', user.name); // Salvează numele utilizatorului
      navigate('/');
    } catch (error) {
      console.error("Email sau parolă incorectă.", error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <h2>Autentificare</h2>
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Parolă" onChange={handleChange} required />
      <button type="submit">Autentifică-te</button>
    </form>
  );
};

export default Login;
