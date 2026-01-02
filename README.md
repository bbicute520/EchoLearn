# EchoLearn

## Project Structure
- `backend/`: Node.js Express server
- `frontend/`: React Vite application
- `docker-compose.yml`: Docker composition for running the app

## Getting Started

### Prerequisites
- Docker & Docker Compose
- Node.js (for local development without Docker)

### Running with Docker
```bash
docker-compose up -d
```

### Running Locally
1. Backend:
   ```bash
   cd backend
   npm install
   npm start
   ```
2. Frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
