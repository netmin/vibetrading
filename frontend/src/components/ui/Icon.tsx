import React from 'react';

/**
 * Common SVG paths used throughout the application
 */
export const IconPaths = {
  // Navigation and Actions
  arrowRight: "M14 5l7 7m0 0l-7 7m7-7H3",
  externalLink: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14",
  refresh: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
  close: "M6 18L18 6M6 6l12 12",
  
  // Status indicators
  checkmark: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
  success: "M5 13l4 4L19 7",
  error: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
  
  // Misc
  lock: "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z",
};

export type IconName = keyof typeof IconPaths;

interface IconProps {
  /** The name of the icon to display */
  name: IconName;
  /** The size of the icon (both width and height) */
  size?: number | string;
  /** The color of the icon - uses currentColor by default */
  color?: string;
  /** Whether to fill or stroke the icon */
  filled?: boolean;
  /** Additional class names */
  className?: string;
  /** Stroke width when not filled */
  strokeWidth?: number;
}

/**
 * Icon component for displaying SVG icons consistently
 */
export default function Icon({
  name,
  size = 20,
  color,
  filled = false,
  className = '',
  strokeWidth = 2,
}: IconProps) {
  const path = IconPaths[name];
  
  if (!path) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={color ? { color } : undefined}
    >
      <path d={path} />
    </svg>
  );
}