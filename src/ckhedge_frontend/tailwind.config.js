/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customPurple: '#4600AE',
        customPink: '#FF005E',
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
      },
      fontFamily: {
        'mont': ['Montserrat', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
    },
    screens: {
      ts: "350px",
      xs: "375px",
      xs1: "420px",
      ss: "550px",
      ss1: "600px",
      sm: "770px",
      md: "900px",
      md1: "1000px",
      lg: "1300px",
      xl: "1700px",
      'h-sm': { 'raw': '(min-height: 700px)' },
      'h-md': { 'raw': '(min-height: 900px)' },
      'h-lg': { 'raw': '(min-height: 1000px)' },
    },
  },
  plugins: [],
}
