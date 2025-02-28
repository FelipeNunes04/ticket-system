const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ticketRoutes = require('./src/routes/tickets');
const teamMemberRoutes = require('./src/routes/teamMembers');

const app = express();
const PORT = process.env.PORT || 5001;

// Configure CORS for multiple environments
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://ticket-system-frontend.onrender.com'
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Ticket System API' });
});

app.use('/api/tickets', ticketRoutes);
app.use('/api/team-members', teamMemberRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
