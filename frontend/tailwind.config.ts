import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: 'var(--color-base)',
        card: 'var(--color-card)',
        border: 'var(--color-border)',
        accent: 'var(--color-accent)',
        'accent-hover': 'var(--color-accent-hover)',
        danger: 'var(--color-danger)',
        'text-primary': 'var(--color-text-primary)',
        'text-muted': 'var(--color-text-muted)',
        // Keep old colors for backward compatibility
        background: 'var(--color-base)',
        text: 'var(--color-text-primary)',
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
