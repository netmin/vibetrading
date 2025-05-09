import React from 'react';

interface TypingDotsProps {
  color?: string;
  size?: number;
  className?: string;
}

export default function TypingDots({ 
  color = 'accent', 
  size = 2, 
  className = '' 
}: TypingDotsProps) {
  // Determine the color class based on the color prop
  const colorClass = color === 'accent' ? 'bg-accent' : `bg-${color}`;
  
  return (
    <div className={`flex gap-1 items-center ${className}`}>
      <div 
        className={`w-${size} h-${size} ${colorClass} rounded-full animate-pulse`}
        aria-hidden="true"
      ></div>
      <div 
        className={`w-${size} h-${size} ${colorClass} rounded-full animate-pulse delay-100`}
        aria-hidden="true"
      ></div>
      <div 
        className={`w-${size} h-${size} ${colorClass} rounded-full animate-pulse delay-200`}
        aria-hidden="true"
      ></div>
      <span className="sr-only">Assistant is typing</span>
    </div>
  );
}