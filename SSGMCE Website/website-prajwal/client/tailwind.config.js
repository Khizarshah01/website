/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ssgmce-blue': '#1e3a5f',
        'ssgmce-dark-blue': '#152d4a',
        'ssgmce-light-blue': '#4a90d9',
        'ssgmce-orange': '#e07a3a',
        'ssgmce-light-orange': '#f0a060',
        'ssgmce-accent': '#2c7a7b',
        'ssgmce-surface': '#f8fafc',
        'ssgmce-muted': '#64748b',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.813rem', { lineHeight: '1.25rem' }],
        'base': ['0.875rem', { lineHeight: '1.5rem' }],
        'lg': ['0.938rem', { lineHeight: '1.625rem' }],
        'xl': ['1rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.125rem', { lineHeight: '1.875rem' }],
        '3xl': ['1.25rem', { lineHeight: '2rem' }],
        '4xl': ['1.5rem', { lineHeight: '2.25rem' }],
        '5xl': ['1.875rem', { lineHeight: '2.5rem' }],
        '6xl': ['2.25rem', { lineHeight: '2.75rem' }],
        '7xl': ['3rem', { lineHeight: '3.5rem' }],
      },
    },
  },
  plugins: [],
}
