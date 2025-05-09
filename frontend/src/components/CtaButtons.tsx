import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthState } from '../hooks/useAuthState'
import PayModal from './PayModal'

export default function CtaButtons() {
  const { status, setStatus } = useAuthState()
  const [showPayModal, setShowPayModal] = useState(false)
  
  // For demo purposes, we'll add a function to manually change the status
  const handleDemoStatusChange = (newStatus: 'guest' | 'waitlist' | 'paid') => {
    setStatus(newStatus)
  }

  if (status === 'guest') {
    return (
      <div className="space-y-4">
        <Link to="/#subscribe" className="btn block text-center">
          Join Wait-list
        </Link>
        <p className="text-sm text-text/60 text-center">
          Get early access to our trading insights
        </p>
      </div>
    )
  }

  if (status === 'waitlist') {
    return (
      <div className="space-y-4">
        <button 
          onClick={() => setShowPayModal(true)} 
          className="btn block w-full"
        >
          Upgrade to Premium
        </button>
        <p className="text-sm text-text/60 text-center">
          Get full access to all trading signals
        </p>
        
        {showPayModal && (
          <PayModal onClose={() => setShowPayModal(false)} />
        )}
        
        {/* Demo controls - remove in production */}
        <div className="mt-8 p-4 border border-border rounded-md">
          <p className="text-sm font-semibold mb-2">Demo Controls</p>
          <div className="flex space-x-2">
            <button 
              onClick={() => handleDemoStatusChange('guest')}
              className="text-xs px-2 py-1 bg-border rounded"
            >
              Set Guest
            </button>
            <button 
              onClick={() => handleDemoStatusChange('paid')}
              className="text-xs px-2 py-1 bg-accent rounded"
            >
              Set Paid
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (status === 'paid') {
    return (
      <div className="space-y-4">
        <div className="bg-accent/20 border border-accent rounded-md p-4 text-center">
          <p className="font-semibold">Premium Member</p>
          <p className="text-sm">You have full access to all features</p>
        </div>
        <Link to="/discord" className="btn block text-center">
          Join Discord Community
        </Link>
        
        {/* Demo controls - remove in production */}
        <div className="mt-8 p-4 border border-border rounded-md">
          <p className="text-sm font-semibold mb-2">Demo Controls</p>
          <div className="flex space-x-2">
            <button 
              onClick={() => handleDemoStatusChange('guest')}
              className="text-xs px-2 py-1 bg-border rounded"
            >
              Set Guest
            </button>
            <button 
              onClick={() => handleDemoStatusChange('waitlist')}
              className="text-xs px-2 py-1 bg-border rounded"
            >
              Set Waitlist
            </button>
          </div>
        </div>
      </div>
    )
  }

  return null
}