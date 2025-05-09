import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/tailwind.css'

// Initialize MSW in development mode
async function initMSW() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./api/worker.ts')
    await worker.start()
  }
}

// Start MSW and then render the app
initMSW().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
})