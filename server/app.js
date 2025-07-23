const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Config
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Import des routes (à ajouter plus tard)
// const authRoutes = require('./routes/authRoutes');
// const ticketRoutes = require('./routes/ticketRoutes');
// app.use('/api/auth', authRoutes);
// app.use('/api/tickets', ticketRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 