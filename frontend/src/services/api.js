import axios from 'axios';

// Priority: 1. Environment variable 2. Default local development URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const api = {
  getTickets: async () => {
    try {
      const response = await axios.get(`${API_URL}/tickets`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tickets:', error);
      throw error;
    }
  },
  
  createTicket: async (ticketData) => {
    try {
      const response = await axios.post(`${API_URL}/tickets`, ticketData);
      return response.data;
    } catch (error) {
      console.error('Error creating ticket:', error);
      throw error;
    }
  },
  
  updateTicketStatus: async (id, status) => {
    try {
      const response = await axios.patch(`${API_URL}/tickets/${id}`, { status });
      return response.data;
    } catch (error) {
      console.error(`Error updating ticket ${id}:`, error);
      throw error;
    }
  },
  
  getTeamMembers: async () => {
    try {
      const response = await axios.get(`${API_URL}/team-members`);
      return response.data;
    } catch (error) {
      console.error('Error fetching team members:', error);
      throw error;
    }
  }
};

export default api;
