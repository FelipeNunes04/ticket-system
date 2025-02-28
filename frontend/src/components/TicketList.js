import React, { useState, useEffect } from 'react';
import api from '../services/api';

const TicketList = ({ refresh }) => {
  const [tickets, setTickets] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const [ticketsData, membersData] = await Promise.all([
          api.getTickets(),
          api.getTeamMembers()
        ]);
        
        setTickets(ticketsData);
        setTeamMembers(membersData);
        setError(null);
      } catch (err) {
        setError('Failed to load tickets. Please refresh.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refresh]);

  const handleStatusChange = async (ticketId, newStatus) => {
    try {
      await api.updateTicketStatus(ticketId, newStatus);
      
      setTickets(prevTickets => 
        prevTickets.map(ticket => 
          ticket.id === ticketId 
            ? { ...ticket, status: newStatus } 
            : ticket
        )
      );
    } catch (err) {
      console.error('Failed to update ticket status:', err);
      alert('Failed to update ticket status. Please try again.');
    }
  };

  const getTeamMemberName = (memberId) => {
    const member = teamMembers.find(m => m.id === memberId);
    return member ? member.name : 'Unassigned';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No deadline';
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'open':
        return 'bg-secondary';
      case 'in-progress':
        return 'bg-primary';
      case 'review':
        return 'bg-info';
      case 'closed':
        return 'bg-success';
      default:
        return 'bg-secondary';
    }
  };

  if (loading) return <div className="loading">Loading tickets...</div>;
  if (error) return <div className="error">{error}</div>;
  if (tickets.length === 0) return <div className="no-tickets">No tickets found. Create one!</div>;

  return (
    <div className="ticket-list">
      <h2>Tickets</h2>
      
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Assigned To</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.title}</td>
                <td>
                  <div className="description-truncate">
                    {ticket.description.substring(0, 100)}
                    {ticket.description.length > 100 ? '...' : ''}
                  </div>
                </td>
                <td>{getTeamMemberName(ticket.assignedTo)}</td>
                <td>{formatDate(ticket.deadline)}</td>
                <td>
                  <span className={`badge ${getStatusBadgeClass(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </td>
                <td>
                  <div className="dropdown">
                    <button 
                      className="btn btn-sm btn-outline-secondary dropdown-toggle" 
                      type="button" 
                      id={`status-dropdown-${ticket.id}`} 
                      data-bs-toggle="dropdown" 
                      aria-expanded="false"
                    >
                      Change Status
                    </button>
                    <ul className="dropdown-menu" aria-labelledby={`status-dropdown-${ticket.id}`}>
                      <li>
                        <button 
                          className="dropdown-item" 
                          onClick={() => handleStatusChange(ticket.id, 'open')}
                          disabled={ticket.status === 'open'}
                        >
                          Open
                        </button>
                      </li>
                      <li>
                        <button 
                          className="dropdown-item" 
                          onClick={() => handleStatusChange(ticket.id, 'in-progress')}
                          disabled={ticket.status === 'in-progress'}
                        >
                          In Progress
                        </button>
                      </li>
                      <li>
                        <button 
                          className="dropdown-item" 
                          onClick={() => handleStatusChange(ticket.id, 'review')}
                          disabled={ticket.status === 'review'}
                        >
                          Review
                        </button>
                      </li>
                      <li>
                        <button 
                          className="dropdown-item" 
                          onClick={() => handleStatusChange(ticket.id, 'closed')}
                          disabled={ticket.status === 'closed'}
                        >
                          Closed
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketList;
