// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PartyList from './components/PartyList';
import PartyDetails from './components/PartyDetails';
import Register from './components/Register';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Party Planner</h1>
        <Routes>
          <Route path="/" element={<ProtectedRoute><PartyList /></ProtectedRoute>} />
          <Route path="/party/:id" element={<ProtectedRoute><PartyDetails /></ProtectedRoute>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
