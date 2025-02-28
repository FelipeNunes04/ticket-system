import React, { useState } from 'react';
import './App.css';
import TicketForm from './components/TicketForm';
import TicketList from './components/TicketList';
import TeamMembersList from './components/TeamMembersList';

function App() {
  const [refreshCounter, setRefreshCounter] = useState(0);

  const handleTicketCreated = () => {
    setRefreshCounter(prev => prev + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ticket Management System</h1>
      </header>

      <main className="container mt-4">
        <div className="row">
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <TicketForm onTicketCreated={handleTicketCreated} />
              </div>
            </div>
            
            <div className="card mb-4">
              <div className="card-body">
                <TeamMembersList />
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <TicketList refresh={refreshCounter} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-5 py-3 text-center text-muted">
        <div className="container">
          <p>Ticket Management System - Skill-based Assignment</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
