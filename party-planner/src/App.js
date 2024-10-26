import React, { useEffect, useState } from 'react';
import { Route, Routes, Link, useNavigate, useLocation } from 'react-router-dom';
import PartyList from './components/PartyList';
import PartyDetails from './components/PartyDetails';
import CreateParty from './components/CreateParty';
import Register from './components/Register';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css'
;
function App() {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token && location.pathname !== '/register' && location.pathname !== '/login') {
      navigate('/register');
    }
  }, [navigate, location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setUserName(''); // Resetează userName
    navigate('/login');
  };

  return (
    <div className="App">
      <header style={{ position: 'fixed', top: '10px', left: '10px', fontSize: '1.2rem' }}>
        {userName ? `Welcome, ${userName}` : ""}
      </header>
      <button className="logout" onClick={handleLogout}>Logout</button>
      <h1>Party Planner</h1>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><PartyList /></ProtectedRoute>} />
        <Route path="/party/:id" element={<ProtectedRoute><PartyDetails /></ProtectedRoute>} />
        <Route path="/create-party" element={<ProtectedRoute><CreateParty /></ProtectedRoute>} />
      </Routes>
      <Link to="/create-party">
        <button style={{ marginTop: '20px' }}>Creează Eveniment Nou</button>
      </Link>
    </div>
  );
}

export default App;
