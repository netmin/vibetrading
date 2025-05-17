# Vibe Trading Agent Service

A Docker-based Python service that uses the OpenAI Agents SDK to implement an interactive agent informing users about the "Vibe Trading" project. The agent greets visitors, explains that the project is in development, and collects email addresses for launch notifications.

## Features

- **Interactive AI Agent**: Uses OpenAI Agents to provide information about Vibe Trading
- **Email Collection**: Prompts visitors to leave their email for updates
- **Email Storage**: Validates and persists email addresses in a SQLite database
- **Admin Interface**: Secure endpoint to view collected emails
- **Docker Support**: Easy deployment with Docker and Docker Compose
- **React Frontend**: Modern web interface with chat-based email collection

## Project Structure

```
.
├── app/                    # Main backend application code
│   ├── agent/              # OpenAI Agent implementation
│   ├── api/                # API endpoints
│   ├── db/                 # Database layer
│   ├── utils/              # Utility functions
│   └── main.py             # Application entry point
├── frontend_bak/           # React frontend application
│   ├── src/                # Frontend source code
│   │   ├── api/            # API client utilities
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   └── ...             # Other frontend files
│   └── ...                 # Frontend config files
├── data/                   # Persistent data storage (mounted volume)
├── Dockerfile              # Backend container definition
├── Dockerfile.frontend     # Frontend container definition
├── docker-compose.yml      # Backend service orchestration
├── docker-compose.frontend.yml  # Full stack orchestration
├── requirements.txt        # Python dependencies
└── README.md               # Project documentation
```

## Prerequisites

- Docker and Docker Compose
- OpenAI API key

## Environment Variables

Create a `.env` file in the project root with the following variables:

```
OPENAI_API_KEY=your_openai_api_key_here

# Admin credentials (optional, defaults shown)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin

# Telegram notifications (optional)
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

## Setup and Installation

### Option 1: Backend Only

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd openai_agent
   ```

2. Build and start the backend service:
   ```bash
   docker-compose up -d
   ```

This will:
- Build the Docker image
- Start the container on port 8000
- Create a persistent volume for the SQLite database

### Option 2: Full Stack (Backend + Frontend)

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd openai_agent
   ```

2. Build and start both services:
   ```bash
   docker-compose -f docker-compose.frontend.yml up -d
   ```

This will:
- Build both the backend and frontend Docker images
- Start the backend on port 8000
- Start the frontend on port 5173
- Configure the frontend to communicate with the backend

## Development

### Backend Development

To run the backend service locally:

1. Create a virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the service:
   ```bash
   uvicorn app.main:app --reload
   ```

### Frontend Development

The frontend is a simple HTML file with JavaScript:

1. Open the static HTML file:
   ```bash
   cd frontend
   open index-dev.html
   ```

2. For testing with the backend, run the Docker stack as described below.

## API Endpoints

### Chat with the Agent
```
POST /api/chat
Content-Type: application/json

{
  "message": "Tell me about Vibe Trading"
}
```

### Subscribe with Email
```
POST /api/subscribe
Content-Type: application/json

{
  "email": "user@example.com"
}
```

### Get All Subscribers (Admin only)
```
GET /api/admin/subscribers
Authorization: Basic <base64 encoded username:password>
```

### Health Check
```
GET /health
```

## Architecture

The service uses a functional/procedural programming style (no OOP) with these components:

1. **FastAPI Web Framework**: Handles HTTP requests and responses
2. **OpenAI Agents SDK**: Powers the interactive AI agent
3. **SQLite Database**: Stores collected email addresses
4. **React Frontend**: Provides a modern web interface
5. **Docker**: Containerizes the application for easy deployment

## Security Notes

- Change default admin credentials in production
- The service uses Basic Authentication for the admin endpoints
- Email validation is performed to prevent invalid data
- SQLite database is stored in a Docker volume for persistence

## Logging

The backend configures a shared logger for the entire application and the FastAPI server. Logging output uses the standard Python `logging` module and writes
to stdout. The configuration resides in `app/utils/logging_config.py` and is
initialized when the server starts.
