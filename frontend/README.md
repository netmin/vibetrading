# Vibe Trading Frontend

This is the frontend for the Vibe Trading application, built with React, TypeScript, and Tailwind CSS.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```
   cd frontend
   ```
3. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn
   ```

### Development

To start the development server:

```
npm run dev
```

or

```
yarn dev
```

This will start the development server at [http://localhost:5173](http://localhost:5173).

### Building for Production

To build the application for production:

```
npm run build
```

or

```
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── api/             # API clients and mock handlers
│   ├── components/      # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── styles/          # CSS and Tailwind styles
│   ├── App.tsx          # Main App component
│   └── main.tsx         # Entry point
├── index.html           # HTML template
├── tailwind.config.ts   # Tailwind CSS configuration
└── vite.config.ts       # Vite configuration
```

## Features

- Landing page with email subscription form
- Chat interface with different templates based on user status
- Payment modal with QR code for Solana payments
- Mock API for development

## Environment Variables

- `VITE_API`: Base URL for the API (optional, defaults to empty string for local development)

## Demo Mode

The application includes demo controls to simulate different user states:
- Guest: Default state, can join waitlist
- Waitlist: Can upgrade to premium
- Paid: Has full access to all features