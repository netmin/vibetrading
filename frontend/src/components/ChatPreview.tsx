import React from 'react';
import MessageBubble from './MessageBubble';

export default function ChatPreview() {
  return (
    <div className="w-full max-w-md mx-auto rounded-2xl overflow-hidden border border-accent/20 shadow-2xl bg-card/80 backdrop-blur-md transform hover:-translate-y-1 hover:shadow-accent/20 transition-all duration-300 relative">
      {/* Glow effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5 opacity-50 pointer-events-none"></div>
      <div className="absolute h-40 w-40 bg-accent/20 rounded-full blur-3xl -top-20 -right-20 opacity-20 pointer-events-none"></div>
      <div className="absolute h-20 w-20 bg-accent/20 rounded-full blur-xl -bottom-10 -left-10 opacity-20 pointer-events-none"></div>
      
      {/* Chat header */}
      <div className="backdrop-blur-md bg-card/90 h-14 flex items-center px-4 border-b border-accent/10 relative">
        <div className="flex space-x-2 mr-3">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
          <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
        </div>
        <div className="flex items-center">
          <div className="h-5 w-5 text-accent mr-2">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
              <path d="M2 12C2 6.48 6.44 2 12 2C17.56 2 22 6.48 22 12C22 17.52 17.56 22 12 22C6.44 22 2 17.52 2 12Z" 
                className="stroke-accent" strokeWidth="1.5" />
              <path d="M8 13C8.55228 13 9 12.5523 9 12C9 11.4477 8.55228 11 8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13Z" 
                className="fill-accent" />
              <path d="M16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11C15.4477 11 15 11.4477 15 12C15 12.5523 15.4477 13 16 13Z" 
                className="fill-accent" />
              <path d="M8.5 17C10.25 15.5 13.75 15.5 15.5 17" 
                className="stroke-accent" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-medium text-accent">VibeTrading AI</span>
          <span className="ml-1 text-xs px-1.5 py-0.5 bg-accent/10 text-accent rounded-md">Beta</span>
        </div>
      </div>
      
      {/* Chat messages */}
      <div className="bg-card/40 backdrop-blur-sm h-96 overflow-y-auto p-6 space-y-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card/50 pointer-events-none"></div>
        <div className="relative z-10">
          {/* User message 1 */}
          <MessageBubble 
            role="user" 
            content="Can you test this strategy: Buy Bitcoin when its 50-day moving average crosses above the 200-day moving average, and sell when it crosses below." 
          />
          
          {/* Assistant response 1 */}
          <MessageBubble 
            role="assistant" 
            content="I'll backtest this moving average crossover strategy for BTC.

Results (2018-2023):
• Total Returns: +324%
• Max Drawdown: -32%
• Sharpe Ratio: 1.23
• Win Rate: 68%

Would you like to see a detailed breakdown or modify any parameters?" 
          />
          
          {/* User message 2 */}
          <MessageBubble 
            role="user" 
            content="Can you try adding a RSI filter to only buy when RSI is below 40?" 
          />
        </div>
      </div>
      
      {/* Chat input */}
      <div className="bg-card/60 backdrop-blur-md h-16 flex items-center px-4 border-t border-accent/10">
        <div className="bg-background/60 w-full rounded-xl h-10 flex items-center overflow-hidden shadow-inner border border-accent/5">
          <input 
            type="text" 
            className="w-full bg-transparent border-none focus:outline-none px-4 py-2"
            placeholder="Type your strategy idea..."
            disabled
          />
          <button className="relative overflow-hidden rounded-lg px-4 py-2 h-full group mr-1">
            <span className="absolute inset-0 bg-gradient-to-r from-accent to-accent/80 group-hover:scale-105 transition-all duration-300"></span>
            <span className="relative flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}