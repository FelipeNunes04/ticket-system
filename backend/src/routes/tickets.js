const express = require('express');
const router = express.Router();
const { tickets, teamMembers } = require('../data');
const { findSuitableTeamMember, generateTicketId } = require('../ticketUtils');

// Get all tickets
router.get('/', (req, res) => {
  res.json(tickets);
});

// Get ticket by ID
router.get('/:id', (req, res) => {
  const ticket = tickets.find(t => t.id === parseInt(req.params.id));
  if (!ticket) {
    return res.status(404).json({ message: 'Ticket not found' });
  }
  res.json(ticket);
});

// Create a new ticket
router.post('/', (req, res) => {
  const { title, description, deadline } = req.body;
  
  // Validate input
  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }
  
  // Generate new ID
  const id = generateTicketId(tickets);
  
  // Find suitable team member based on skills
  const assignedTo = findSuitableTeamMember(description);
  
  // Create new ticket
  const newTicket = {
    id,
    title,
    description,
    deadline: deadline || null,
    status: 'open',
    assignedTo,
    createdAt: new Date().toISOString()
  };
  
  tickets.push(newTicket);
  res.status(201).json(newTicket);
});

// Update ticket status
router.patch('/:id', (req, res) => {
  const { status } = req.body;
  const id = parseInt(req.params.id);
  
  const ticketIndex = tickets.findIndex(t => t.id === id);
  if (ticketIndex === -1) {
    return res.status(404).json({ message: 'Ticket not found' });
  }
  
  // Validate status
  const validStatuses = ['open', 'in-progress', 'review', 'closed'];
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }
  
  // Update the ticket
  tickets[ticketIndex] = {
    ...tickets[ticketIndex],
    ...req.body,
    id // Ensure ID doesn't change
  };
  
  res.json(tickets[ticketIndex]);
});

// Delete a ticket
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const ticketIndex = tickets.findIndex(t => t.id === id);
  
  if (ticketIndex === -1) {
    return res.status(404).json({ message: 'Ticket not found' });
  }
  
  const deletedTicket = tickets.splice(ticketIndex, 1)[0];
  res.json(deletedTicket);
});

module.exports = router;
