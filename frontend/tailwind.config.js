/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: [ // Removed for Tailwind v4 automatic content detection
  //   './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  //   './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  //   './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  //   './src/app/app.css',
  // ],
  // theme: { // Theme configuration moved to appcss @theme
  //   extend: {
  //     fontFamily: {
  //       sans: ['var(--font-geist-sans)'],
  //       mono: ['var(--font-geist-mono)'],
  //     },
  //     colors: {
  //       primary: {
  //         50: '#FFF7ED',
  //         100: '#FFEDD5',
  //         200: '#FED7AA',
  //         300: '#FDBA74',
  //         400: '#FB923C',
  //         500: '#F97316',
  //         600: '#EA580C',
  //         700: '#C2410C',
  //         800: '#9A3412',
  //         900: '#7C2D12',
  //         950: '#4D1403',
  //       },
  //     },
  //   },
  // ],
  // Remove the typography plugin as we'll define styles in CSS
  plugins: [], 
};