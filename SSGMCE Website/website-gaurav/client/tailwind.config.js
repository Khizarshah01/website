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
        'xs': ['0.863rem', { lineHeight: '1.2rem' }],
        'sm': ['0.935rem', { lineHeight: '1.4rem' }],
        'base': ['1.006rem', { lineHeight: '1.725rem' }],
        'lg': ['1.079rem', { lineHeight: '1.85rem' }],
        'xl': ['1.15rem', { lineHeight: '1.95rem' }],
        '2xl': ['1.294rem', { lineHeight: '2.15rem' }],
        '3xl': ['1.438rem', { lineHeight: '2.3rem' }],
        '4xl': ['1.725rem', { lineHeight: '2.6rem' }],
        '5xl': ['2.156rem', { lineHeight: '2.9rem' }],
        '6xl': ['2.588rem', { lineHeight: '3.15rem' }],
        '7xl': ['3.45rem', { lineHeight: '3.95rem' }],
      },
    },
  },
  plugins: [],
}
