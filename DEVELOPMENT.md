# Development Guide

This document provides more detailed instructions for setting up and running the Vibe Trading Agent project in development mode.

## Backend Development

### Setting Up the Backend

1. Create a virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Create a `.env` file in the project root with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. Initialize the database:
   ```bash
   mkdir -p data
   ```

### Running the Backend

Run the backend service:
```bash
python -m app.main
```

The backend will be available at http://localhost:8000.

### Testing Backend Endpoints

You can test the backend endpoints using curl:

```bash
# Health check
curl http://localhost:8000/health

# Chat with the agent
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Tell me about Vibe Trading"}'

# Subscribe with email
curl -X POST http://localhost:8000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'

# Get subscribers (admin only)
curl -X GET http://localhost:8000/api/admin/subscribers \
  -H "Authorization: Basic $(echo -n admin:admin | base64)"
```

## Frontend Development

### Static HTML Frontend

We've simplified the frontend to a static HTML file that includes all necessary JavaScript functionality:

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Edit the HTML file as needed:
   ```bash
   nano index-dev.html
   ```

3. Open the file directly in your browser:
   ```bash
   open index-dev.html
   ```

Note: When opening directly in a browser, the API calls to the backend won't work. To test with the backend, use the Docker setup described below.

## Full Stack Development

For full stack development with Docker:

1. Build and start the entire stack:
   ```bash
   docker-compose -f docker-compose.frontend.yml up --build
   ```

2. Access the frontend at http://localhost and the backend API at http://localhost/api

For manual development:

1. Start the backend:
   ```bash
   python -m app.main
   ```

2. For the frontend, just open the HTML file in your browser or serve it with a simple HTTP server:
   ```bash
   cd frontend
   python -m http.server 8080
   ```

   Then access it at http://localhost:8080/index-dev.html

## Docker Development

### Building and Running with Docker

Build and run the full stack with Docker Compose:
```bash
docker-compose -f docker-compose.frontend.yml up --build
```

This will:
- Build the backend Docker image
- Build the frontend Docker image
- Start the backend on port 8000
- Start the frontend development server on port 5173

### Developing with Docker

The Docker setup includes volume mounts for the frontend, so your changes will be reflected in real time.
You don't need to rebuild the container when making changes to the frontend code.

If you need to install new npm packages or modify the Dockerfile itself, you'll need to rebuild:
```bash
docker-compose -f docker-compose.frontend.yml down
docker-compose -f docker-compose.frontend.yml up --build
```

## Troubleshooting

### Backend Issues

- Check the logs with `docker logs vibe-trading-agent`
- Ensure your OpenAI API key is correctly set in the `.env` file
- Check if the required ports are available and not in use

### Frontend Issues

- Check the logs with `docker logs vibe-trading-frontend`
- Ensure the API proxy is correctly configured in `vite.config.ts`
- Make sure the backend is running and accessible

## Architecture Notes

- The backend uses Robyn web server with OpenAI Agents
- The frontend uses React with Vite
- Communication between frontend and backend is via REST API
- Docker Compose orchestrates the entire stack