const express = require('express');
const cors = require('cors');
require('dotenv').config();

const studentsRoute = require('./routes/students');
const documentsRoute = require('./routes/documents');
const insightsRoute = require('./routes/insights');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/students', studentsRoute);
app.use('/api/documents', documentsRoute);
app.use('/api/insights', insightsRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
