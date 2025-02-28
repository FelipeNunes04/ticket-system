import React, { useState } from 'react';
import api from '../services/api';

const TicketForm = ({ onTicketCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !description) {
      setError('Title and description are required');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      setSuccessMessage('');
      
      const ticketData = {
        title,
        description,
        deadline: deadline || null
      };
      
      const newTicket = await api.createTicket(ticketData);
      
      setTitle('');
      setDescription('');
      setDeadline('');
      
      // Show success message
      setSuccessMessage('Ticket created successfully! It was auto-assigned based on skills.');
      
      if (onTicketCreated) {
        onTicketCreated(newTicket);
      }
      
    } catch (err) {
      setError('Failed to create ticket. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // List of available skills in the system for the hint
  const availableSkills = [
    "frontend", "UI/UX", "React", "backend", "API", "Node.js", 
    "Database", "fullstack", "Testing", "DevOps", "Cloud", 
    "Security", "Performance"
  ];

  return (
    <div className="ticket-form-container">
      <h2>Submit New Ticket</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter ticket title"
            required
          />
        </div>
        
        <div className="form-group mb-3">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue and mention relevant skills (e.g., React, Database)"
            rows="4"
            required
          />
          <small className="form-text text-muted">
            Mention relevant technologies to help with skill-based assignment. 
            Available skills in the system: {availableSkills.join(", ")}
          </small>
        </div>
        
        <div className="form-group mb-3">
          <label htmlFor="deadline">Deadline (optional):</label>
          <input
            type="date"
            id="deadline"
            className="form-control"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Ticket'}
        </button>
      </form>
    </div>
  );
};

export default TicketForm;
