import { useState } from 'react';

export default function RiskDisclosure() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <details 
        className="group" 
        open={isOpen} 
        onToggle={() => setIsOpen(!isOpen)}
      >
        <summary className="flex items-center cursor-pointer list-none">
          <span className="text-sm font-semibold text-text/70 hover:text-accent transition-colors">
            Risk Disclosure
          </span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-4 w-4 ml-2 text-text/50 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </summary>
        
        <div className="mt-4 text-sm text-text/70 bg-card/30 p-4 rounded-md">
          <p className="mb-4">Vibe Trading is an experimental project. Please be aware of the following risks:</p>
          
          <ul className="list-disc pl-5 space-y-2">
            <li>Trading cryptocurrencies involves significant risk and can result in the loss of your invested capital.</li>
            <li>Past performance of any trading strategy is not indicative of future results.</li>
            <li>Automated trading systems may not perform as expected in all market conditions.</li>
            <li>Technical issues, including but not limited to connectivity problems, may affect trading performance.</li>
            <li>Always do your own research and consider consulting with a financial advisor before making investment decisions.</li>
          </ul>
          
          <p className="mt-4">By using Vibe Trading, you acknowledge that you understand and accept these risks.</p>
        </div>
      </details>
    </div>
  );
}