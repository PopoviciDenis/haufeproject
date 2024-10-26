// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PartyList from './components/PartyList';
import PartyDetails from './components/PartyDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Party Planner</h1>
        <Routes>
          <Route path="/" element={<PartyList />} />
          <Route path="/party/:id" element={<PartyDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
