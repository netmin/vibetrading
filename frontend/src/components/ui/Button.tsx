import React, { ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

/**
 * Props for the Button component, extending HTML button attributes
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant of the button */
  variant?: 'primary' | 'secondary' | 'outline' | 'link';
  /** Optional icon to display after the button text */
  iconRight?: React.ReactNode;
  /** If provided, renders as a Link instead of a button */
  to?: string;
  /** Additional classes to apply */
  className?: string;
  /** Whether the button takes full width of its container */
  fullWidth?: boolean;
  /** Whether the button should display a loading state */
  isLoading?: boolean;
  /** Used for external links when 'to' is provided */
  external?: boolean;
}

/**
 * Button component with different visual styles and states
 */
export default function Button({
  children,
  variant = 'primary',
  iconRight,
  to,
  className = '',
  fullWidth = false,
  isLoading = false,
  external = false,
  ...props
}: ButtonProps) {
  // Common class names for all button variants
  const baseClasses = `
    group relative 
    py-3 px-6 
    text-base font-medium 
    rounded-xl 
    overflow-hidden 
    transition-all duration-300
    ${fullWidth ? 'w-full block text-center' : 'inline-flex items-center justify-center'}
    ${props.disabled ? 'opacity-70 cursor-not-allowed' : ''}
  `;

  // Classes for specific variants
  const variantClasses = {
    primary: 'text-gray-800', // Primary buttons have dark text on light backgrounds
    secondary: 'text-accent', // Secondary buttons have accent-colored text
    outline: 'text-accent',   // Outline buttons have accent-colored text
    link: 'text-accent underline-offset-2 hover:underline'
  };

  // The inner content with optional loading state
  const content = (
    <>
      {/* Different background effects based on variant */}
      {variant === 'primary' && (
        <>
          <span className="absolute inset-0 bg-gradient-to-r from-accent to-accent/80 group-hover:scale-105 transition-all duration-300"></span>
          <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-accent via-accent/90 to-accent/80 transition-opacity duration-300"></span>
          <span className="absolute bottom-0 left-0 right-0 h-1 bg-white/20"></span>
          <span className="absolute inset-0 shadow-[0_4px_14px_0px_rgba(0,118,255,0.39)] group-hover:shadow-[0_6px_20px_rgba(0,118,255,0.4)] transition-all duration-300"></span>
        </>
      )}
      
      {variant === 'secondary' && (
        <>
          <span className="absolute inset-0 border-2 border-accent/50 rounded-xl group-hover:border-accent transition-colors duration-300"></span>
          <span className="absolute inset-0 bg-transparent group-hover:bg-accent/5 transition-colors duration-300"></span>
        </>
      )}
      
      {variant === 'outline' && (
        <span className="absolute inset-0 border border-accent/30 rounded-xl group-hover:border-accent/60 transition-colors duration-300"></span>
      )}

      {/* Button content with optional loading spinner */}
      <span className={`relative z-10 flex items-center justify-center ${variantClasses[variant]}`}>
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
          </>
        ) : (
          <>
            {children}
            {iconRight && (
              <span className={`ml-2 transition-transform ${variant !== 'link' ? 'group-hover:translate-x-1' : ''}`}>
                {iconRight}
              </span>
            )}
          </>
        )}
      </span>
    </>
  );

  // For link buttons
  if (to) {
    // External link
    if (external) {
      return (
        <a 
          href={to}
          className={`${baseClasses} ${className}`}
          target="_blank"
          rel="noopener noreferrer"
          {...(props as any)}
        >
          {content}
        </a>
      );
    }
    
    // Internal link (React Router)
    return (
      <Link to={to} className={`${baseClasses} ${className}`} {...(props as any)}>
        {content}
      </Link>
    );
  }

  // Regular button
  return (
    <button className={`${baseClasses} ${className}`} {...props}>
      {content}
    </button>
  );
}