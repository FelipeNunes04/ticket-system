import React, { useState, useEffect } from 'react';
import api from '../services/api';

const TeamMembersList = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        const members = await api.getTeamMembers();
        setTeamMembers(members);
        setError(null);
      } catch (err) {
        setError('Failed to load team members');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  const handleChange = (e) => {
    const memberId = parseInt(e.target.value);
    if (memberId) {
      const member = teamMembers.find(m => m.id === memberId);
      setSelectedMember(member);
    } else {
      setSelectedMember(null);
    }
  };

  if (loading) return <p>Loading team members...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="team-members-dropdown">
      <h2>Team Members</h2>
      
      <div className="form-group">
        <select 
          className="form-select mb-3" 
          onChange={handleChange} 
          value={selectedMember?.id || ''}
          aria-label="Select team member to view details"
        >
          <option value="">Select a team member to view skills</option>
          {teamMembers.map(member => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>
      </div>

      {selectedMember && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{selectedMember.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              Skills:
            </h6>
            <div className="mb-2">
              {selectedMember.skills.map((skill, index) => (
                <span key={index} className="badge bg-info text-dark me-1 mb-1">
                  {skill}
                </span>
              ))}
            </div>
            <p className="card-text">
              <small className="text-muted">
                Status: {selectedMember.availability ? 'Available' : 'Unavailable'}
              </small>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamMembersList; 