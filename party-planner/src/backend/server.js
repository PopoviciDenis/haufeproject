// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');  // Importează pachetul cors
const partyRoutes = require('./routes/partyRoutes');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));
const PORT = process.env.PORT || 5000;
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Database connection error:", err));

app.use('/api/parties', partyRoutes); // folosim rutele pentru petreceri

app.listen(PORT, () => {
    console.log("MONGO_URI:", process.env.MONGO_URI);
});


// Funcție pentru a obține toate petrecerile
const fetchParties = async () => {
    const response = await fetch('http://localhost:5000/api/parties');
    const data = await response.json();
    setParties(data); // setParties fiind funcția de setare pentru un useState din React
  };
  
  // Funcție pentru a adăuga o petrecere nouă
  const addParty = async (newParty) => {
    const response = await fetch('http://localhost:5000/api/parties', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newParty),
    });
    const data = await response.json();
    setParties([...parties, data]);
  };
  