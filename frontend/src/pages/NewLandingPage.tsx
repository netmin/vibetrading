import { useState } from 'react'
import Layout from '../components/Layout'
import ChatWidget from '../components/ChatWidget'
import { subscribeEmail } from '../api/subscriptionApi'

export default function NewLandingPage() {
  const handleEmailSubmit = async (email: string) => {
    try {
      // Send email to backend API using our subscription API utility
      const result = await subscribeEmail(email);
      console.log('Email submission response:', result);

      // You could add a toast notification here if desired
      if (!result.success) {
        console.error('Failed to subscribe:', result.message);
      }
    } catch (error) {
      console.error('Error submitting email:', error);
    }
  };

  return (
    <Layout>
      {/* Hero Section with Chat */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="relative z-10 mb-8">
                {/* Professional typography with precise spacing and visual hierarchy */}
                <div className="relative">
                  <span className="block text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-2 text-white">
                    Trade Smarter with
                  </span>
                  {/* Accent element to draw attention */}
                  <div className="absolute left-0 top-0 h-full w-1 bg-accent rounded-full hidden md:block"></div>
                </div>

                <div className="relative">
                  <span className="block text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
                    AI-Powered
                  </span>
                  <span className="block text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
                    Strategies
                  </span>

                  {/* Subtle accent line for visual polish */}
                  <div className="absolute -bottom-4 left-0 w-20 h-1 bg-accent rounded-full"></div>

                  {/* Modern decorative element */}
                  <div className="absolute -right-4 -top-4 w-12 h-12 rounded-full border-2 border-accent/30 hidden md:block"></div>
                </div>
              </h1>
              <p className="text-lg text-text-secondary mb-6">
                Vibe Trading uses a proprietary LLM trained on real market data to transform your ideas into backtested strategies within seconds. Our results are continually verified so you can trade with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="bg-card/30 backdrop-blur-sm rounded-full px-4 py-2 border border-accent/10 flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-xs">AS</div>
                    <div className="w-8 h-8 rounded-full bg-accent/30 flex items-center justify-center text-xs">JL</div>
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-xs">PK</div>
                  </div>
                  <span className="text-sm text-text-secondary">Join over 120 early adopters</span>
                </div>
                <a 
                  href="https://app.thevibe.trading"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative max-w-xs text-center py-2 px-6 font-medium text-white overflow-hidden rounded-xl"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-accent to-accent/80 group-hover:scale-105 transition-all duration-300"></span>
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-accent via-accent/90 to-accent/80 transition-opacity duration-300"></span>
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-white/20"></span>
                  <span className="relative z-10 flex items-center justify-center text-gray-800 font-medium">
                    Get Started
                  </span>
                  <span className="absolute inset-0 shadow-[0_4px_14px_0px_rgba(0,118,255,0.39)] group-hover:shadow-[0_6px_20px_rgba(0,118,255,0.4)] transition-all duration-300"></span>
                </a>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              {/* Live Chat Widget instead of a static interface */}
              <div className="relative">
                {/* Highlight effect for the entire chat widget - now matching the logo glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-accent via-accent/50 to-accent rounded-lg blur-md opacity-30 group-hover:opacity-70 transition duration-300 -z-10"></div>
                <ChatWidget onEmailSubmit={handleEmailSubmit} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature highlights */}
      <div className="container mx-auto px-4 py-20 bg-gradient-to-b from-card/5 to-card/10">
        <div className="max-w-[1100px] mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-5 text-accent">Why Vibe Trading?</h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Our platform combines advanced algorithms with sentiment analysis to help you make better trading decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-[1100px] mx-auto">
          {[
            {
              title: "Market Sentiment Intel",
              description: "Leverage real-time sentiment from news and social channels to uncover opportunities before the crowd.",
              iconSvg: (
                <div className="relative flex items-center justify-center">
                  {/* Premium layered sentiment icon with orbital ring and pulse effect */}
                  <div className="absolute inset-0 rounded-full bg-accent/5 animate-pulse"></div>
                  <svg className="w-16 h-16 text-accent relative" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Outer orbital ring */}
                    <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.2" strokeDasharray="2 2" className="animate-[spin_20s_linear_infinite]" />

                    {/* Inner decorative circles */}
                    <circle cx="7" cy="8" r="1.5" fill="currentColor" fillOpacity="0.3" />
                    <circle cx="17" cy="8" r="1.5" fill="currentColor" fillOpacity="0.3" />
                    <circle cx="17" cy="16" r="1.5" fill="currentColor" fillOpacity="0.3" />
                    <circle cx="7" cy="16" r="1.5" fill="currentColor" fillOpacity="0.3" />

                    {/* Central sentiment visualization */}
                    <path d="M8 12C8 11.4477 8.44772 11 9 11H15C15.5523 11 16 11.4477 16 12C16 12.5523 15.5523 13 15 13H9C8.44772 13 8 12.5523 8 12Z" fill="currentColor" />

                    {/* Radiating data waves */}
                    <path d="M5 9C6.5 7.5 9.5 7 12 7C14.5 7 17.5 7.5 19 9" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.5" />
                    <path d="M5 15C6.5 16.5 9.5 17 12 17C14.5 17 17.5 16.5 19 15" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.5" />

                    {/* Central core */}
                    <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1" />
                    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                  </svg>

                  {/* Subtle glow effect */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-accent/20 rounded-full blur-lg -z-10"></div>
                </div>
              )
            },
            {
              title: "LLM-Generated Strategies",
              description: "Our LLM converts your instructions into tested trading algorithms—no coding required.",
              iconSvg: (
                <div className="relative flex items-center justify-center">
                  {/* Premium algorithmic strategy icon with animated elements */}
                  <div className="absolute inset-0 rounded-full bg-accent/5"></div>

                  <svg className="w-16 h-16 text-accent relative" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Circuit board background pattern */}
                    <path
                      d="M3 3V21M6 3V9M6 12V21M9 3V6M9 9V15M9 18V21M12 3V18M12 21V21M15 3V6M15 9V12M15 15V21M18 3V15M18 18V21M21 3V6M21 9V21M3 3H21M3 6H6M9 6H15M18 6H21M3 9H3M6 9H9M15 9H18M21 9H21M3 12H6M9 12H15M3 15H9M12 15H15M18 15H21M3 18H9M12 18H18M3 21H21"
                      stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.5" strokeLinecap="round"
                    />

                    {/* Main algorithmic nodes */}
                    <circle cx="6" cy="6" r="1.5" fill="currentColor" fillOpacity="0.6" className="animate-ping" style={{animationDuration: '4s'}} />
                    <circle cx="12" cy="12" r="1.8" fill="currentColor" fillOpacity="0.8" />
                    <circle cx="18" cy="18" r="1.5" fill="currentColor" fillOpacity="0.6" className="animate-ping" style={{animationDuration: '3.5s'}} />
                    <circle cx="18" cy="6" r="1.5" fill="currentColor" fillOpacity="0.6" className="animate-ping" style={{animationDuration: '5s'}} />
                    <circle cx="6" cy="18" r="1.5" fill="currentColor" fillOpacity="0.6" className="animate-ping" style={{animationDuration: '4.5s'}} />

                    {/* Strategy connection paths with animated dashes */}
                    <path
                      d="M6 6L12 12M12 12L18 18M18 6L12 12M12 12L6 18"
                      stroke="currentColor" strokeWidth="1" strokeDasharray="1 1"
                      className="animate-[dash_15s_linear_infinite]"
                    />

                    {/* Central algorithm hexagon */}
                    <path
                      d="M12 8L15.5 10V14L12 16L8.5 14V10L12 8Z"
                      stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.1"
                    />

                    {/* Data flow particles */}
                    <circle cx="9" cy="9" r="0.5" fill="currentColor" className="animate-ping" style={{animationDuration: '2s'}} />
                    <circle cx="15" cy="15" r="0.5" fill="currentColor" className="animate-ping" style={{animationDuration: '2.2s'}} />
                    <circle cx="9" cy="15" r="0.5" fill="currentColor" className="animate-ping" style={{animationDuration: '1.8s'}} />
                    <circle cx="15" cy="9" r="0.5" fill="currentColor" className="animate-ping" style={{animationDuration: '2.5s'}} />
                  </svg>

                  {/* Subtle glow effect */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-accent/20 rounded-full blur-lg -z-10"></div>
                </div>
              )
            },
            {
              title: "Instant Alerts",
              description: "Receive notifications the moment our analysis spots setups that match your parameters.",
              iconSvg: (
                <div className="relative flex items-center justify-center">
                  {/* Premium real-time alerts icon with animated pulse effects */}
                  <div className="absolute inset-0 rounded-full bg-accent/5"></div>

                  <svg className="w-12 h-12 text-accent relative" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Animated radar-like rings */}
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.07" strokeWidth="0.5" className="animate-ping" style={{animationDuration: '4s'}} />
                    <circle cx="12" cy="12" r="7" stroke="currentColor" strokeOpacity="0.12" strokeWidth="0.5" className="animate-ping" style={{animationDuration: '3s'}} />
                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeOpacity="0.2" strokeWidth="0.5" className="animate-ping" style={{animationDuration: '2s'}} />

                    {/* Alert bell shape with thin professional lines */}
                    <path
                      d="M12 4.5C8.5 4.5 6.5 7.5 6.5 9.5C6.5 11.5 5.5 13 4.5 14C3.5 15 4 16.5 5 17H19C20 16.5 20.5 15 19.5 14C18.5 13 17.5 11.5 17.5 9.5C17.5 7.5 15.5 4.5 12 4.5Z"
                      stroke="currentColor" strokeWidth="1.25" fill="currentColor" fillOpacity="0.05"
                    />

                    {/* Bell handle */}
                    <path d="M14 17C14 18.6569 13.1046 20 12 20C10.8954 20 10 18.6569 10 17"
                      stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"
                    />

                    {/* Bell clapper */}
                    <path d="M12 4.5V8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />

                    {/* Notification indicator dot */}
                    <circle cx="16.5" cy="7.5" r="2.5" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="0.75" />
                    <circle cx="16.5" cy="7.5" r="1" fill="currentColor" className="animate-pulse" />

                    {/* Alert waves */}
                    <path
                      d="M8 9C8.5 8 9.5 7.5 12 7.5C14.5 7.5 15.5 8 16 9"
                      stroke="currentColor" strokeWidth="0.75" strokeDasharray="0.5 0.5" className="animate-pulse"
                    />
                    <path
                      d="M16 12C15.5 13 14.5 13.5 12 13.5C9.5 13.5 8.5 13 8 12"
                      stroke="currentColor" strokeWidth="0.75" strokeDasharray="0.5 0.5" className="animate-pulse"
                    />

                    {/* Data points with varying animation timings */}
                    <circle cx="18" cy="12" r="0.5" fill="currentColor" className="animate-ping" style={{animationDuration: '2s'}} />
                    <circle cx="6" cy="12" r="0.5" fill="currentColor" className="animate-ping" style={{animationDuration: '1.7s'}} />
                    <circle cx="9" cy="7" r="0.5" fill="currentColor" className="animate-ping" style={{animationDuration: '2.2s'}} />
                    <circle cx="15" cy="7" r="0.5" fill="currentColor" className="animate-ping" style={{animationDuration: '1.9s'}} />
                  </svg>

                  {/* Subtle glow effect */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-accent/20 rounded-full blur-lg -z-10"></div>
                </div>
              )
            }
          ].map((feature, index) => (
            <div key={index} className="group relative bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-accent/5 hover:border-accent/20 transition-all duration-500 shadow-lg hover:shadow-accent/5 flex flex-col items-center">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500 -z-10"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/10 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-70 transition duration-500 -z-10"></div>

              {/* Icon container with premium styling - fixed size and perfectly centered */}
              <div className="mb-8 relative h-36 w-full flex items-center justify-center">
                <div className="absolute inset-0 rounded-lg bg-accent/5 blur-md transform rotate-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-white/10 h-28 w-28 rounded-xl border border-accent/10 backdrop-blur-sm transition-all duration-300 transform group-hover:translate-y-[-5px] flex items-center justify-center">
                  {feature.iconSvg}
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3 text-center text-white group-hover:text-accent transition-all duration-300">{feature.title}</h3>
              <p className="text-text-secondary leading-relaxed text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Premium testimonial section */}
      <div className="container mx-auto px-4 py-24 bg-gradient-to-b from-card/10 to-card/5">
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md rounded-3xl p-10 border border-accent/10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-30 -z-10"></div>
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6 border border-accent/20">
              <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.25 11H14.75L15.25 15L14 18.5H10L8.75 15L9.25 11Z" fill="currentColor" fillOpacity="0.3"/>
                <path d="M8.75 9C8.75 6.65279 10.6528 4.75 13 4.75C15.3472 4.75 17.25 6.65279 17.25 9L17.25 10.25L16.5 10.5H9.5L8.75 10.25V9Z" fill="currentColor" fillOpacity="0.3"/>
                <path d="M12 4V2M4 12H2M6.34315 6.34315L4.92893 4.92893M17.6569 6.34315L19.0711 4.92893M20 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 19.25V19.75M12 19.75C10.7574 19.75 9.75 20.7574 9.75 22H14.25C14.25 20.7574 13.2426 19.75 12 19.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 10.5821C9 10.5821 9.75 10.25 12 10.25C14.25 10.25 15 10.5821 15 10.5821M15 10.5821V9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9V10.5821ZM15 10.5821L15.5 15L14.25 18.5H9.75L8.5 15L9 10.5821Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              "Vibe Trading transformed how I trade"
            </h3>

            <p className="text-lg text-text-secondary mb-8 max-w-2xl leading-relaxed">
              The AI-driven sentiment insights reveal shifts before they hit the charts. It's become an essential part of my strategy.
            </p>

            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-accent/20 mr-4 flex items-center justify-center text-accent font-bold">JM</div>
              <div className="text-left">
                <div className="font-semibold">Jordan McAllister</div>
                <div className="text-text-secondary text-sm">Professional Trader, New York</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-black/40 backdrop-blur-lg border-t border-accent/10">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-[1100px] mx-auto flex flex-col items-center text-center">
            <div className="mb-8">
              <div className="flex items-center justify-center mb-4">
                <h3 className="font-bold text-2xl text-accent">Vibe Trading</h3>
                <span className="ml-2 bg-accent/10 text-accent text-xs px-2 py-1 rounded-full border border-accent/20">
                  Beta
                </span>
              </div>
              <p className="text-text-secondary mb-8 max-w-lg mx-auto">
                Empowering traders with AI-driven strategies and rigorous performance verification.
              </p>
            </div>

            <div className="mb-8">
              <h4 className="font-semibold text-lg mb-6">Connect With Us</h4>
              <div className="flex flex-wrap justify-center gap-6">
                {/* Discord */}
                <a href="https://discord.gg/yEG83gYM" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-[#5865F2]/10 flex items-center justify-center border border-[#5865F2]/30 group-hover:bg-[#5865F2]/20 transition-colors duration-300">
                    <svg className="w-7 h-7 text-[#5865F2]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                    </svg>
                  </div>
                </a>

                {/* X (Twitter) */}
                <a href="https://x.com/vibecatdev" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-[#000000]/10 flex items-center justify-center border border-[#000000]/30 group-hover:bg-[#000000]/20 transition-colors duration-300">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </div>
                </a>

                {/* Telegram */}
                <a href="https://t.me/vibecatdev" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-[#26A5E4]/10 flex items-center justify-center border border-[#26A5E4]/30 group-hover:bg-[#26A5E4]/20 transition-colors duration-300">
                    <svg className="w-6 h-6 text-[#26A5E4]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Footer content removed as requested */}
        </div>
      </div>

      {/* Fixed chat widget that appears on all pages for visitors */}
      <div className="lg:hidden">
        <ChatWidget onEmailSubmit={handleEmailSubmit} position="fixed" />
      </div>
    </Layout>
  );
}
