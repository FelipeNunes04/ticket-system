# Ticket Management System

A full-stack ticket management system with skill-based assignment built with React and Node.js.

## Features

- Client request submission form with title, description, and deadline
- Team member dropdown with 5 hardcoded members and their skills
- Ticket list with status display and management
- REST API for ticket handling
- In-memory data storage (no database required)
- Skill-based ticket assignment algorithm

## Project Structure

- `frontend/`: React application for the client interface
- `backend/`: Node.js Express server with REST API

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm

### Installation

1. Clone the repository
2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```
   cd backend
   npm start
   ```
   The server will run on http://localhost:5001

2. Start the frontend development server:
   ```
   cd frontend
   npm start
   ```
   The React app will run on http://localhost:3000

## Deployment

The application is configured for easy deployment on Render.com:

1. Fork or clone this repository to your GitHub account
2. Sign up for a free account on [Render](https://render.com)
3. In Render, click on "New" and select "Blueprint"
4. Connect your GitHub repository and select it
5. Render will automatically deploy both the frontend and backend using the configuration in `render.yaml`

### Manual Deployment

Alternatively, you can deploy the frontend and backend separately:

#### Backend Deployment
1. In Render, create a new Web Service
2. Connect to your repository and select the `backend` directory
3. Use `npm install` as the build command
4. Use `npm run start-prod` as the start command
5. Set the environment variable `PORT` to `8080`

#### Frontend Deployment
1. In Render, create a new Static Site
2. Connect to your repository and select the `frontend` directory
3. Use `npm install && npm run build` as the build command
4. Set the publish directory to `build`
5. Add the environment variable `REACT_APP_API_URL` pointing to your backend URL + `/api`

## How It Works

1. **Create a Ticket**:
   - Fill in the ticket form with title, description, and optional deadline
   - The system auto-assigns based on skills mentioned in the description

2. **Skill-Based Assignment**:
   - The system analyzes the ticket description
   - The system matches skills mentioned in the description with team members' skills
   - The most suitable team member is automatically assigned to the ticket

3. **Ticket Management**:
   - View all tickets in the list with their respective statuses
   - Update ticket status (Open, In Progress, Review, Closed)
   - The list shows which team member is assigned to each ticket

## API Endpoints

### Tickets
- `GET /api/tickets`: Get all tickets
- `GET /api/tickets/:id`: Get ticket by ID
- `POST /api/tickets`: Create a new ticket
- `PATCH /api/tickets/:id`: Update ticket status
- `DELETE /api/tickets/:id`: Delete a ticket

### Team Members
- `GET /api/team-members`: Get all team members
- `GET /api/team-members/:id`: Get team member by ID
- `PATCH /api/team-members/:id`: Update team member availability
