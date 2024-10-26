// backend/routes/partyRoutes.js
const express = require('express');
const Party = require('../models/Party');
const router = express.Router();

// Ruta pentru a obține toate petrecerile
router.get('/', async (req, res) => {
  try {
    const parties = await Party.find();
    res.json(parties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta pentru a adăuga o petrecere nouă
router.post('/', async (req, res) => {
    console.log(req.body); // Vezi datele trimise
    const { title, date, budget } = req.body;
    const party = new Party({ title, date, budget, responsibilities: [] });
    try {
      const newParty = await party.save();
      res.status(201).json(newParty);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  

// Ruta pentru a adăuga o responsabilitate la o petrecere
router.post('/:id/responsibilities', async (req, res) => {
  const { name, assignedTo } = req.body;
  try {
    const party = await Party.findById(req.params.id);
    if (party) {
      party.responsibilities.push({ name, assignedTo });
      await party.save();
      res.status(201).json(party);
    } else {
      res.status(404).json({ message: "Party not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// src/backend/routes/partyRoutes.js
router.post('/:id/responsibilities', async (req, res) => {
    const { name, assignedTo } = req.body;
    try {
      const party = await Party.findById(req.params.id);
      if (party) {
        party.responsibilities.push({ name, assignedTo, status: 'pending' });
        await party.save();
        res.status(201).json(party);
      } else {
        res.status(404).json({ message: "Party not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  router.get('/:id', async (req, res) => {
    try {
      const party = await Party.findById(req.params.id);
      if (party) {
        res.json(party);
      } else {
        res.status(404).json({ message: "Party not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  


module.exports = router;
