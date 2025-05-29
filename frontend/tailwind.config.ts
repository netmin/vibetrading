import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: 'rgb(var(--color-base) / <alpha-value>)',
        card: 'rgb(var(--color-card) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        'accent-hover': 'rgb(var(--color-accent-hover) / <alpha-value>)',
        danger: 'rgb(var(--color-danger) / <alpha-value>)',
        'text-primary': 'rgb(var(--color-text-primary) / <alpha-value>)',
        'text-muted': 'rgb(var(--color-text-muted) / <alpha-value>)',
        // Keep old colors for backward compatibility
        background: 'rgb(var(--color-base) / <alpha-value>)',
        text: 'rgb(var(--color-text-primary) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: { 
        xl: '0.75rem' 
      },
      boxShadow: {
        'soft-glow': '0 0 8px rgba(14,165,233,0.15)',
        'accent': '0 0 8px rgba(14,165,233,0.15)',
      },
      animation: {
        'fade-in': 'fadeIn .1s ease-in',
      },
      keyframes: {
        fadeIn: { 
          '0%': { opacity: '0' }, 
          '100%': { opacity: '1' } 
        },
      },
    },
  },
  plugins: [],
} satisfies Config
