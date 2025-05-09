import React from 'react';

interface CardProps {
  /** Card content */
  children: React.ReactNode;
  /** Optional header text or component */
  header?: React.ReactNode;
  /** Optional footer text or component */
  footer?: React.ReactNode;
  /** Visual variant of the card */
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
  /** Additional class names */
  className?: string;
  /** Optional onClick handler */
  onClick?: () => void;
  /** Whether the card is interactive (adds hover effects) */
  interactive?: boolean;
}

/**
 * Card component for displaying content in a contained, styled box
 */
export default function Card({
  children,
  header,
  footer,
  variant = 'default',
  className = '',
  onClick,
  interactive = false,
}: CardProps) {
  // Base styles for all card variants
  const baseClasses = 'rounded-xl';
  
  // Classes specific to each variant
  const variantClasses = {
    default: 'bg-card border border-border shadow-sm',
    elevated: 'bg-card border border-border shadow-lg',
    outlined: 'bg-transparent border border-border',
    glass: 'bg-card/80 backdrop-blur-sm border border-accent/10'
  };
  
  // Interactive state classes
  const interactiveClasses = interactive 
    ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer'
    : '';

  return (
    <div 
      className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${interactiveClasses} 
        ${className}
      `}
      onClick={onClick}
    >
      {/* Card header */}
      {header && (
        <div className="px-6 py-4 border-b border-border">
          {typeof header === 'string' ? (
            <h3 className="text-lg font-semibold">{header}</h3>
          ) : (
            header
          )}
        </div>
      )}
      
      {/* Card content */}
      <div className={`px-6 py-4 ${!header && !footer ? 'py-6' : ''}`}>
        {children}
      </div>
      
      {/* Card footer */}
      {footer && (
        <div className="px-6 py-4 border-t border-border">
          {footer}
        </div>
      )}
    </div>
  );
}