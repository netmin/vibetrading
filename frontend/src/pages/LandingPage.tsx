import Layout from '../components/Layout'
import LandingHero from '../components/LandingHero'
import SocialProof from '../components/SocialProof'
import HowItWorks from '../components/HowItWorks'
import EmailForm from '../components/EmailForm'
import PricingCard from '../components/PricingCard'
import { useAuthState } from '../hooks/useAuthState'

export default function LandingPage() {
  const { status } = useAuthState()

  return (
    <Layout>
      {/* Hero Section */}
      <LandingHero />

      {/* Social Proof */}
      <SocialProof />

      {/* How it Works */}
      <div className="container mx-auto px-4 py-16">
        <HowItWorks />
      </div>

      {/* Simple section divider */}
      <div className="relative my-12">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-accent/10"></div>
        </div>
        <div className="relative flex justify-center">
          <div className="flex items-center space-x-4 bg-background px-6">
            <div className="w-2 h-2 rounded-full bg-accent/20"></div>
            <div className="w-3 h-3 rounded-full bg-accent/30"></div>
            <div className="w-2 h-2 rounded-full bg-accent/20"></div>
          </div>
        </div>
      </div>

      {/* Email Form and Pricing Card */}
      <div className="container mx-auto px-4 py-16">
        {status === 'guest' && (
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 flex flex-col min-h-[420px] shadow-lg border border-accent/10 hover:shadow-accent/10 transition-all duration-300 relative group overflow-hidden">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent/10 via-transparent to-transparent rounded-lg blur-md opacity-30 group-hover:opacity-70 transition duration-300 -z-10"></div>
              <EmailForm />
            </div>
            <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 flex flex-col min-h-[420px] shadow-lg border border-accent/10 hover:shadow-accent/10 transition-all duration-300 relative group overflow-hidden">
              <div className="absolute -inset-1 bg-gradient-to-l from-accent/10 via-transparent to-transparent rounded-lg blur-md opacity-30 group-hover:opacity-70 transition duration-300 -z-10"></div>
              <PricingCard />
            </div>
          </div>
        )}

        {status !== 'guest' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg border border-accent/10 relative overflow-hidden">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 rounded-lg blur-lg opacity-50 -z-10"></div>
              <div className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
                <span className="text-accent font-medium flex items-center">
                  {status === 'waitlist' ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      You're on the wait-list!
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      Welcome back, premium member!
                    </>
                  )}
                </span>
              </div>
              <a href="/chat" className="group relative w-full py-3 px-6 text-base font-medium block text-center text-white overflow-hidden rounded-xl">
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
              </a>
            </div>

            {status === 'waitlist' && (
              <div className="mt-12 bg-card/30 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-accent/10 relative group overflow-hidden">
                <div className="absolute -inset-1 bg-gradient-to-l from-accent/10 via-transparent to-transparent rounded-lg blur-md opacity-30 group-hover:opacity-70 transition duration-300 -z-10"></div>
                <PricingCard />
              </div>
            )}
          </div>
        )}
      </div>
      
    </Layout>
  )
}
