import React from 'react';
import Icon, { IconName } from './Icon';

interface BadgeProps {
  /** The text content of the badge */
  children: React.ReactNode;
  /** Optional icon to display before the text */
  icon?: IconName;
  /** Visual variant of the badge */
  variant?: 'accent' | 'success' | 'warning' | 'danger' | 'info';
  /** Size of the badge */
  size?: 'sm' | 'md';
  /** Make the badge rounded-full (pill style) */
  pill?: boolean;
  /** Additional class names */
  className?: string;
}

/**
 * Badge component for displaying small status indicators, tags, or labels
 */
export default function Badge({
  children,
  icon,
  variant = 'accent',
  size = 'sm',
  pill = false,
  className = '',
}: BadgeProps) {
  // Maps variants to appropriate background and text colors
  const variantStyles = {
    accent: 'bg-accent/10 text-accent border-accent/20',
    success: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    danger: 'bg-red-100 text-red-800 border-red-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200',
  };

  // Maps sizes to appropriate padding and font sizes
  const sizeStyles = {
    sm: 'px-1.5 py-0.5 text-xs',
    md: 'px-2 py-1 text-sm',
  };

  return (
    <span
      className={`
        inline-flex items-center 
        font-semibold 
        ${sizeStyles[size]} 
        ${variantStyles[variant]} 
        ${pill ? 'rounded-full' : 'rounded-md'} 
        border 
        ${className}
      `}
    >
      {icon && (
        <Icon
          name={icon}
          size={size === 'sm' ? 12 : 14}
          className="mr-1"
        />
      )}
      {children}
    </span>
  );
}