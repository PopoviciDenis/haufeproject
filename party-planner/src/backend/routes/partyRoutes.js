// backend/routes/partyRoutes.js
const express = require('express');
const Party = require('../models/Party.js');
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
  
  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedParty = await Party.findByIdAndDelete(id);
      if (!deletedParty) {
        return res.status(404).json({ message: 'Evenimentul nu a fost găsit' });
      }
      res.status(200).json({ message: 'Evenimentul a fost șters cu succes' });
    } catch (error) {
      res.status(500).json({ message: 'Eroare la ștergerea evenimentului' });
    }
  });

  router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Acest email este deja utilizat" });
      }
      const user = new User({ firstName, lastName, email, password });
      await user.save();
      res.status(201).json({ message: "Cont creat cu succes" });
    } catch (error) {
      res.status(500).json({ message: "Eroare server" });
    }
  });
  
  

module.exports = router;
