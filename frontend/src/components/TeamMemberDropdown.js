import React, { useState, useEffect } from 'react';
import api from '../services/api';

const TeamMemberDropdown = ({ onSelectMember, selectedMemberId }) => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    const selectedMember = teamMembers.find(member => member.id === memberId);
    onSelectMember(selectedMember);
  };

  if (loading) return <p>Loading team members...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="team-member-dropdown">
      <label htmlFor="team-member">Assign to Team Member:</label>
      <select 
        id="team-member" 
        value={selectedMemberId || ''} 
        onChange={handleChange}
        className="form-select"
      >
        <option value="">Auto-assign (based on skills)</option>
        {teamMembers.map(member => (
          <option key={member.id} value={member.id}>
            {member.name} - Skills: {member.skills.join(', ')}
          </option>
        ))}
      </select>
      <small className="form-text text-muted">
        If not selected, a team member will be automatically assigned based on skills matching.
      </small>
    </div>
  );
};

export default TeamMemberDropdown;
