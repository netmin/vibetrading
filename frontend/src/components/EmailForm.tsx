import { useState, FormEvent } from 'react'
import { useAuthState } from '../hooks/useAuthState'
import { Button, Icon, Card } from './ui'

/**
 * EmailForm component for handling wait-list subscriptions
 */
export default function EmailForm() {
  // State management
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const { setStatus } = useAuthState()

  // Benefits list
  const benefits = [
    'Be first to know about new features',
    'Exclusive updates and previews'
  ];

  /**
   * Handle form submission for waitlist signup
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Simple validation
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Submit to API
      const API_ROOT = import.meta.env.VITE_API ?? ''
      const response = await fetch(`${API_ROOT}/api/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error('Failed to subscribe')
      }

      const data = await response.json()

      // Update auth state with the response
      setStatus('waitlist')

      // Show success message
      setSuccess(true)

      // Clear form
      setEmail('')
    } catch (err) {
      setError('Something went wrong. Try again or ping us on X.')
    } finally {
      setLoading(false)
    }
  }

  // Success state view
  if (success) {
    return (
      <div className="w-full h-full flex flex-col justify-center" id="subscribe">
        <Card variant="glass" className="p-2">
          <div className="text-center">
            <Icon 
              name="success"
              size={64}
              className="mx-auto text-accent mb-6"
            />
            <h2 className="text-2xl font-semibold mb-3">Welcome aboard!</h2>
            <p className="text-text/80">Check your inbox for the invite link.</p>
          </div>
        </Card>
      </div>
    )
  }

  // Form view
  return (
    <div className="w-full h-full flex flex-col" id="subscribe">
      <h2 className="text-2xl font-semibold mb-6 text-center">Join the Wait-list</h2>

      <form onSubmit={handleSubmit} className="flex flex-col flex-grow justify-between">
        {/* Email input section */}
        <div>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input w-full rounded-md py-3 text-base"
            placeholder="Enter your best e-mail"
            disabled={loading}
            required
            aria-label="Email Address"
          />
          
          {/* Benefits section */}
          <div className="mt-4 space-y-3">
            <p className="text-text-muted">
              Stay up-to-date with the latest developments and early access opportunities.
            </p>
            
            {/* Benefit items */}
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <Icon 
                  name="checkmark"
                  size={20}
                  className="text-accent mr-3 mt-0.5 flex-shrink-0"
                  filled
                />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="text-danger text-sm text-center mt-3">{error}</div>
        )}

        {/* Submit button */}
        <div className="mt-8">
          <Button
            type="submit"
            fullWidth
            disabled={loading}
            isLoading={loading}
            iconRight={<Icon name="arrowRight" size={16} />}
          >
            {loading ? 'Submitting...' : 'Join Wait-list'}
          </Button>
        </div>
      </form>
    </div>
  )
}
