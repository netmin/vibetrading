import React from 'react';

export default function HowItWorks() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-16 relative">
          <span className="relative z-10">How it works</span>
          <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-accent rounded-full"></span>
        </h2>

        {/* Desktop View - Modern Card Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Step 1 */}
          <div className="bg-gradient-to-br from-card/40 to-card/20 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-accent/10 group hover:-translate-y-2 transition-all duration-300">
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300 transform group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
            </div>
            <h3 className="font-bold text-xl mb-3 text-center group-hover:text-accent transition-colors">Describe Your Idea</h3>
            <p className="text-text-muted text-center">Simply chat with our AI assistant and tell it what trading strategy you want to test. No coding needed.</p>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-accent group-hover:w-1/2 transition-all duration-300"></div>
            <div className="mt-4 text-center">
              <span className="inline-block bg-accent/10 text-accent py-1 px-3 rounded-full text-sm font-semibold">Step 1</span>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="bg-gradient-to-br from-card/40 to-card/20 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-accent/10 group hover:-translate-y-2 transition-all duration-300">
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300 transform group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                  <rect x="9" y="9" width="6" height="6"></rect>
                  <line x1="9" y1="1" x2="9" y2="4"></line>
                  <line x1="15" y1="1" x2="15" y2="4"></line>
                  <line x1="9" y1="20" x2="9" y2="23"></line>
                  <line x1="15" y1="20" x2="15" y2="23"></line>
                  <line x1="20" y1="9" x2="23" y2="9"></line>
                  <line x1="20" y1="14" x2="23" y2="14"></line>
                  <line x1="1" y1="9" x2="4" y2="9"></line>
                  <line x1="1" y1="14" x2="4" y2="14"></line>
                </svg>
              </div>
            </div>
            <h3 className="font-bold text-xl mb-3 text-center group-hover:text-accent transition-colors">AI Creates Strategy</h3>
            <p className="text-text-muted text-center">Our advanced LLM automatically transforms your ideas into executable trading algorithms.</p>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-accent group-hover:w-1/2 transition-all duration-300"></div>
            <div className="mt-4 text-center">
              <span className="inline-block bg-accent/10 text-accent py-1 px-3 rounded-full text-sm font-semibold">Step 2</span>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="bg-gradient-to-br from-card/40 to-card/20 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-accent/10 group hover:-translate-y-2 transition-all duration-300">
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300 transform group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="20" x2="12" y2="10"></line>
                  <line x1="18" y1="20" x2="18" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="16"></line>
                </svg>
              </div>
            </div>
            <h3 className="font-bold text-xl mb-3 text-center group-hover:text-accent transition-colors">Instant Backtesting</h3>
            <p className="text-text-muted text-center">Get comprehensive backtest results and performance metrics in seconds, not hours.</p>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-accent group-hover:w-1/2 transition-all duration-300"></div>
            <div className="mt-4 text-center">
              <span className="inline-block bg-accent/10 text-accent py-1 px-3 rounded-full text-sm font-semibold">Step 3</span>
            </div>
          </div>
        </div>

        {/* Mobile View - Modern Vertical Timeline */}
        <div className="md:hidden space-y-12 relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-accent/30"></div>
          
          {/* Step 1 */}
          <div className="relative pl-12">
            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-sm font-bold z-10">1</div>
            <div className="bg-gradient-to-br from-card/40 to-card/20 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-accent/10">
              <h3 className="font-bold text-lg mb-2 text-accent">Describe Your Idea</h3>
              <p className="text-text-muted">Simply chat with our AI assistant and tell it what trading strategy you want to test. No coding needed.</p>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="relative pl-12">
            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-sm font-bold z-10">2</div>
            <div className="bg-gradient-to-br from-card/40 to-card/20 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-accent/10">
              <h3 className="font-bold text-lg mb-2 text-accent">AI Creates Strategy</h3>
              <p className="text-text-muted">Our advanced LLM automatically transforms your ideas into executable trading algorithms.</p>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="relative pl-12">
            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-sm font-bold z-10">3</div>
            <div className="bg-gradient-to-br from-card/40 to-card/20 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-accent/10">
              <h3 className="font-bold text-lg mb-2 text-accent">Instant Backtesting</h3>
              <p className="text-text-muted">Get comprehensive backtest results and performance metrics in seconds, not hours.</p>
            </div>
          </div>
        </div>
        
        {/* Benefits Summary */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card/20 rounded-xl p-6 shadow-md border border-accent/5 hover:border-accent/20 transition-all duration-300">
              <div className="flex items-start">
                <div className="mr-4 p-2 bg-accent/10 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Fast Iteration</h4>
                  <p className="text-text-muted">Test multiple strategies and refine your approach in minutes instead of days.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card/20 rounded-xl p-6 shadow-md border border-accent/5 hover:border-accent/20 transition-all duration-300">
              <div className="flex items-start">
                <div className="mr-4 p-2 bg-accent/10 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">No Code Required</h4>
                  <p className="text-text-muted">Express your trading ideas in natural language without any programming knowledge.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
