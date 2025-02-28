const express = require('express');
const router = express.Router();
const { teamMembers } = require('../data');

// Get all team members
router.get('/', (req, res) => {
  res.json(teamMembers);
});

// Get team member by ID
router.get('/:id', (req, res) => {
  const member = teamMembers.find(m => m.id === parseInt(req.params.id));
  if (!member) {
    return res.status(404).json({ message: 'Team member not found' });
  }
  res.json(member);
});

// Update team member availability
router.patch('/:id', (req, res) => {
  const { availability } = req.body;
  const id = parseInt(req.params.id);
  
  const memberIndex = teamMembers.findIndex(m => m.id === id);
  if (memberIndex === -1) {
    return res.status(404).json({ message: 'Team member not found' });
  }
  
  // Validate availability (if provided)
  if (availability !== undefined && typeof availability !== 'boolean') {
    return res.status(400).json({ message: 'Availability must be a boolean value' });
  }
  
  // Update the team member
  teamMembers[memberIndex] = {
    ...teamMembers[memberIndex],
    ...req.body,
    id // Ensure ID doesn't change
  };
  
  res.json(teamMembers[memberIndex]);
});

module.exports = router;
