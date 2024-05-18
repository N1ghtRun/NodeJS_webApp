const express = require('express');
const cors = require('cors');
const app = express();
const eventRoutes = require('./routes/eventRoutes');
const participantRoutes = require('./routes/participantRoutes')

// Enable all CORS requests
app.use(cors());
app.use(express.json());
app.use('/events/', eventRoutes);
app.use('/participants/', participantRoutes);


module.exports = app;
