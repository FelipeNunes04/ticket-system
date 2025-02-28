// In-memory data store

const teamMembers = [
  {
    id: 1,
    name: "John Smith",
    skills: ["frontend", "UI/UX", "React"],
    availability: true
  },
  {
    id: 2,
    name: "Alice Johnson",
    skills: ["backend", "API", "Node.js", "Database"],
    availability: true
  },
  {
    id: 3,
    name: "David Wilson",
    skills: ["fullstack", "React", "Node.js", "Testing"],
    availability: true
  },
  {
    id: 4,
    name: "Sarah Brown",
    skills: ["DevOps", "Cloud", "Security"],
    availability: true
  },
  {
    id: 5,
    name: "Michael Lee",
    skills: ["Database", "Backend", "Performance"],
    availability: true
  }
];

const tickets = [];

module.exports = {
  teamMembers,
  tickets
};
