const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const partyRoutes = require('./routes/partyRoutes');
const authRoutes = require('./routes/authRoutes'); // Moved up with other imports

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));
const PORT = process.env.PORT || 5000;

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/parties', partyRoutes);

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Database connection error:", err));

app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT);
    console.log("MONGO_URI:", process.env.MONGO_URI);
});
