import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import NewLandingPage from './pages/NewLandingPage'
import ChatShell from './pages/Chat'
import { AuthContext, AuthStatus } from './hooks/useAuthState'

function App() {
  const [authState, setAuthState] = useState<AuthStatus>('guest')

  return (
    <AuthContext.Provider value={{ status: authState, setStatus: setAuthState }}>
      <Router>
        <Routes>
          {/* Use new landing page */}
          <Route path="/" element={<NewLandingPage />} />
          <Route path="/old" element={<LandingPage />} />
          <Route path="/chat" element={<ChatShell />} />
          <Route path="/discord" element={<Navigate to="https://discord.gg/SNRKrSh2wF" />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  )
}

export default App