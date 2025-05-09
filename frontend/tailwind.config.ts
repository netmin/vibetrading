import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: '#0D0D0D',
        card: '#1A1A1A',
        border: '#262626',
        accent: '#38BDF8',
        'accent-hover': '#0EA5E9',
        danger: '#F43F5E',
        'text-primary': '#E4E4E7',
        'text-muted': '#9CA3AF',
        // Keep old colors for backward compatibility
        background: '#0D0D0D',
        text: '#E4E4E7',
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
