import React, { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = 'plaintext' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };
  
  return (
    <div className="relative my-4 rounded-md overflow-hidden">
      {/* Language indicator */}
      {language !== 'plaintext' && (
        <div className="bg-[#2D2D2D] text-text-muted text-xs px-4 py-1 border-b border-[#3E3E3E]">
          {language}
        </div>
      )}
      
      {/* Code content */}
      <div className="relative">
        <pre className="bg-[#1E1E1E] p-4 overflow-x-auto">
          <code className="text-text-primary font-mono text-sm whitespace-pre">
            {code}
          </code>
        </pre>
        
        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 bg-[#2D2D2D] text-text-muted hover:text-text-primary p-1.5 rounded-md transition-colors"
          aria-label={copied ? "Copied to clipboard" : "Copy to clipboard"}
        >
          {copied ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}