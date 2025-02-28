const { teamMembers } = require('./data');

/**
 * Find the most suitable team member for a ticket based on skills
 * and availability
 * @param {string} description - Ticket description to extract skills from
 * @returns {number|null} - ID of best matching team member or null if none found
 */
const findSuitableTeamMember = (description) => {
  const descriptionLower = description.toLowerCase();
  
  // Debug log
  console.log('Finding suitable team member for description:', descriptionLower);
  
  const matchCounts = {};
  
  teamMembers.forEach(member => {
    if (member.availability) {
      matchCounts[member.id] = 0;
    }
  });
  
  teamMembers.forEach(member => {
    if (!member.availability) return;
    
    console.log(`Checking skills for ${member.name} (ID: ${member.id}):`, member.skills);
    
    member.skills.forEach(skill => {
      const skillLower = skill.toLowerCase();
      if (descriptionLower.includes(skillLower)) {
        matchCounts[member.id] += 1;
        console.log(`  Match found for skill "${skill}" - ${member.name} now has ${matchCounts[member.id]} matches`);
      }
    });
  });
  
  console.log('Match counts:', matchCounts);
  
  let bestMatch = null;
  let highestMatchCount = 0;
  
  Object.keys(matchCounts).forEach(memberId => {
    if (matchCounts[memberId] > highestMatchCount) {
      highestMatchCount = matchCounts[memberId];
      bestMatch = parseInt(memberId);
    }
  });
  
  if (highestMatchCount === 0 || 
      Object.values(matchCounts).filter(count => count === highestMatchCount).length > 1) {
    
    let mostSkilledMember = null;
    let highestSkillCount = 0;
    
    teamMembers.forEach(member => {
      if (member.availability && member.skills.length > highestSkillCount) {
        highestSkillCount = member.skills.length;
        mostSkilledMember = member.id;
      }
    });
    
    if (mostSkilledMember !== null && (bestMatch === null || highestMatchCount === 0)) {
      bestMatch = mostSkilledMember;
      console.log(`No specific skill matches found, assigning to most skilled member: ${mostSkilledMember}`);
    }
  }
  
  if (bestMatch === null) {
    const availableMember = teamMembers.find(member => member.availability);
    bestMatch = availableMember ? availableMember.id : null;
    console.log(`Defaulting to first available member: ${bestMatch}`);
  }
  
  const assignedMember = teamMembers.find(m => m.id === bestMatch);
  console.log(`Assigned to: ${assignedMember ? assignedMember.name : 'No one'} (ID: ${bestMatch})`);
  
  return bestMatch;
};

/**
 * Generate a unique ID for a new ticket
 * @param {Array} tickets - Current tickets array
 * @returns {number} - New unique ID
 */
const generateTicketId = (tickets) => {
  if (tickets.length === 0) return 1;
  return Math.max(...tickets.map(ticket => ticket.id)) + 1;
};

module.exports = {
  findSuitableTeamMember,
  generateTicketId
};
