import { useEffect, useState } from 'react'
import { useAuthState } from '../hooks/useAuthState'
import { useInvoice } from '../hooks/useInvoice'

interface PayModalProps {
  onClose: () => void
}

/**
 * PayModal component displays the payment QR code and options for paying with Solana
 */
export default function PayModal({ onClose }: PayModalProps) {
  const { status, setStatus } = useAuthState()
  // In a real app, userId would come from auth
  const [userId, setUserId] = useState<number | null>(1) 
  const { invoiceData, loading, error } = useInvoice(userId)
  const [checkingStatus, setCheckingStatus] = useState(false)

  /**
   * Check the current payment status from the API
   */
  const checkPaymentStatus = async () => {
    if (!userId) return

    setCheckingStatus(true)

    try {
      const API_ROOT = import.meta.env.VITE_API ?? ''
      const response = await fetch(`${API_ROOT}/api/status/${userId}`)

      if (!response.ok) {
        throw new Error('Failed to check payment status')
      }

      const data = await response.json()

      if (data.status === 'paid') {
        setStatus('paid')
        onClose()
      }
    } catch (err) {
      console.error('Error checking payment status:', err)
    } finally {
      setCheckingStatus(false)
    }
  }

  /**
   * Poll for payment status automatically
   */
  useEffect(() => {
    if (!userId) return

    const interval = setInterval(() => {
      checkPaymentStatus()
    }, 5000)

    return () => clearInterval(interval)
  }, [userId])

  /**
   * Simulate a successful payment (for demo purposes)
   */
  const simulatePayment = () => {
    setStatus('paid')
    onClose()
  }

  // SVG paths for icons
  const externalLinkPath = "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14";
  const refreshPath = "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15";

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="card max-w-md w-full relative">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-text/60 hover:text-text"
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center">Upgrade to Premium</h2>

        {/* Conditional rendering for loading/error/content states */}
        {loading ? (
          <div className="text-center py-8">Loading payment details...</div>
        ) : error ? (
          <div className="text-danger py-4">{error}</div>
        ) : invoiceData ? (
          <div className="space-y-6">
            {/* QR code display */}
            <div className="bg-white p-4 rounded-lg mx-auto max-w-[200px] shadow-lg border border-accent/10">
              {invoiceData.qr_svg.startsWith('data:image/svg+xml;base64,') || 
               invoiceData.qr_svg.startsWith('data:image/png;base64,') ? (
                <img 
                  src={invoiceData.qr_svg} 
                  alt="QR Code for Solana payment"
                  className="w-full h-full" 
                />
              ) : (
                <div 
                  dangerouslySetInnerHTML={{ __html: invoiceData.qr_svg }} 
                  className="w-full h-full"
                />
              )}
            </div>

            {/* Wallet links */}
            <div className="text-center">
              <p className="mb-2">Scan with your Solana wallet app</p>
              <a 
                href={invoiceData.solana_url} 
                className="group relative inline-flex items-center justify-center py-2 px-4 text-sm rounded-md overflow-hidden transition-all duration-300 mt-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="absolute inset-0 bg-accent/10 group-hover:bg-accent/20 transition-all duration-300"></span>
                <span className="relative z-10 text-accent font-medium flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 mr-1.5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d={externalLinkPath} 
                    />
                  </svg>
                  Open in Wallet
                </span>
              </a>
            </div>

            {/* Payment status section */}
            <div className="border-t border-border pt-4 mt-4">
              <p className="text-sm text-text/60 mb-2">
                Payment will be confirmed automatically.
              </p>
              <button
                onClick={checkPaymentStatus}
                disabled={checkingStatus}
                className="group relative inline-flex items-center py-1.5 px-3 text-sm rounded-md overflow-hidden transition-all duration-300"
              >
                <span className="absolute inset-0 bg-accent/10 group-hover:bg-accent/20 transition-all duration-300"></span>
                <span className="relative z-10 text-accent font-medium flex items-center">
                  {checkingStatus ? (
                    <>
                      {/* Loading spinner */}
                      <svg 
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-accent" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24"
                      >
                        <circle 
                          className="opacity-25" 
                          cx="12" 
                          cy="12" 
                          r="10" 
                          stroke="currentColor" 
                          strokeWidth="4"
                        ></circle>
                        <path 
                          className="opacity-75" 
                          fill="currentColor" 
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Checking...
                    </>
                  ) : (
                    <>
                      {/* Refresh icon */}
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 mr-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d={refreshPath} 
                        />
                      </svg>
                      Check Payment Status
                    </>
                  )}
                </span>
              </button>
            </div>

            {/* Demo controls section */}
            <div className="border-t border-border pt-4 mt-4">
              <p className="text-sm font-semibold mb-2">Demo Controls</p>
              <button 
                onClick={simulatePayment}
                className="group relative w-full py-3 px-6 text-base font-medium block text-center overflow-hidden rounded-xl"
              >
                {/* Button background and effects */}
                <span className="absolute inset-0 bg-gradient-to-r from-accent to-accent/80 group-hover:scale-105 transition-all duration-300"></span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-accent via-accent/90 to-accent/80 transition-opacity duration-300"></span>
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-white/20"></span>
                
                {/* Button content */}
                <span className="relative z-10 flex items-center justify-center text-gray-800 font-medium">
                  Simulate Successful Payment
                </span>
                
                {/* Button shadow */}
                <span className="absolute inset-0 shadow-[0_4px_14px_0px_rgba(0,118,255,0.39)] group-hover:shadow-[0_6px_20px_rgba(0,118,255,0.4)] transition-all duration-300"></span>
              </button>
            </div>
          </div>
        ) : (
          // No data state
          <div className="text-center py-8">No payment information available</div>
        )}
      </div>
    </div>
  )
}