import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuthState } from '../hooks/useAuthState'
import PayModal from './PayModal'
import ChatPreview from './ChatPreview'

export default function LandingHero() {
  const { status } = useAuthState()
  const [showPayModal, setShowPayModal] = useState(false)

  return (
    <section className="pt-28 pb-24 px-4 md:px-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-2/3 bg-gradient-to-bl from-accent/10 to-transparent rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-accent/5 to-transparent rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div className="flex flex-col">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-accent/10 backdrop-blur-sm border border-accent/20">
              <span className="text-sm font-medium text-accent">AI-Powered Trading Strategies</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-text-primary relative inline-block">
                Vibe Trading —
                <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-accent rounded-full"></span>
              </span><br/>
              <span className="text-text-primary">trade with ideas, </span>
              <span className="text-accent">not interfaces</span>
            </h1>

            <p className="text-xl text-text-muted mb-12 max-w-xl">
              Write your idea — our AI will instantly transform it into a strategy and test it on historical data in seconds.
            </p>

            {status === 'guest' && (
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="#subscribe" 
                  className="group relative max-w-xs text-center py-3 px-8 font-medium text-white overflow-hidden rounded-xl"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-accent to-accent/80 group-hover:scale-105 transition-all duration-300"></span>
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-accent via-accent/90 to-accent/80 transition-opacity duration-300"></span>
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-white/20"></span>
                  <span className="relative z-10 flex items-center justify-center text-gray-800 font-medium">
                    Join Wait-list
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <span className="absolute inset-0 shadow-[0_4px_14px_0px_rgba(0,118,255,0.39)] group-hover:shadow-[0_6px_20px_rgba(0,118,255,0.4)] transition-all duration-300"></span>
                </Link>
                <button 
                  onClick={() => setShowPayModal(true)}
                  className="group relative px-8 py-3 text-base font-medium rounded-xl text-text-primary overflow-hidden"
                >
                  <span className="absolute inset-0 border-2 border-accent/50 rounded-xl group-hover:border-accent transition-colors duration-300"></span>
                  <span className="absolute inset-0 bg-transparent group-hover:bg-accent/5 transition-colors duration-300"></span>
                  <span className="relative z-10 flex items-center justify-center text-accent font-medium">
                    Early-Bird 10 USDC
                    <span className="ml-2 px-1.5 py-0.5 text-xs font-semibold rounded-md bg-accent/10 text-accent">Limited</span>
                  </span>
                </button>
              </div>
            )}

            {status === 'waitlist' && (
              <div>
                <div className="inline-block px-3 py-1 mb-4 rounded-full bg-accent/10 border border-accent/20">
                  <span className="text-sm font-medium text-accent flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    You're on the wait-list!
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    to="/chat" 
                    className="group relative max-w-xs text-center py-3 px-8 font-medium text-white overflow-hidden rounded-xl"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-accent to-accent/80 group-hover:scale-105 transition-all duration-300"></span>
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-accent via-accent/90 to-accent/80 transition-opacity duration-300"></span>
                    <span className="absolute bottom-0 left-0 right-0 h-1 bg-white/20"></span>
                    <span className="relative z-10 flex items-center justify-center text-gray-800 font-medium">
                      Go to Dashboard
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                    <span className="absolute inset-0 shadow-[0_4px_14px_0px_rgba(0,118,255,0.39)] group-hover:shadow-[0_6px_20px_rgba(0,118,255,0.4)] transition-all duration-300"></span>
                  </Link>
                  <button 
                    onClick={() => setShowPayModal(true)}
                    className="group relative px-8 py-3 text-base font-medium rounded-xl text-text-primary overflow-hidden"
                  >
                    <span className="absolute inset-0 border-2 border-accent/50 rounded-xl group-hover:border-accent transition-colors duration-300"></span>
                    <span className="absolute inset-0 bg-transparent group-hover:bg-accent/5 transition-colors duration-300"></span>
                    <span className="relative z-10 flex items-center justify-center text-accent font-medium">
                      Early-Bird 10 USDC
                      <span className="ml-2 px-1.5 py-0.5 text-xs font-semibold rounded-md bg-accent/10 text-accent">Limited</span>
                    </span>
                  </button>
                </div>
              </div>
            )}

            {status === 'paid' && (
              <div>
                <div className="inline-block px-3 py-1 mb-4 rounded-full bg-accent/10 border border-accent/20">
                  <span className="text-sm font-medium text-accent flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Premium member
                  </span>
                </div>
                <Link 
                  to="/chat" 
                  className="group relative inline-block text-center py-3 px-8 font-medium text-white overflow-hidden rounded-xl"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-accent to-accent/80 group-hover:scale-105 transition-all duration-300"></span>
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-accent via-accent/90 to-accent/80 transition-opacity duration-300"></span>
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-white/20"></span>
                  <span className="relative z-10 flex items-center justify-center text-gray-800 font-medium">
                    Go to Dashboard
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <span className="absolute inset-0 shadow-[0_4px_14px_0px_rgba(0,118,255,0.39)] group-hover:shadow-[0_6px_20px_rgba(0,118,255,0.4)] transition-all duration-300"></span>
                </Link>
              </div>
            )}
          </div>

          {/* Right column - Chat Preview with enhanced styling */}
          <div className="flex justify-center lg:justify-end relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 rounded-2xl blur-2xl -z-10"></div>
            <ChatPreview />
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayModal && (
        <PayModal onClose={() => setShowPayModal(false)} />
      )}
    </section>
  )
}
