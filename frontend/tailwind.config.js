/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
    './src/components/Forums/**/*.{js,jsx,ts,tsx}',
     './src/components/Events/**/*.{js,jsx,ts,tsx}',
    './src/components/Forms/**/*.{js,jsx,ts,tsx}',
    './src/components/Profile/**/*.{js,jsx,ts,tsx}',
    './src/components/Navbar/**/*.{js,jsx,ts,tsx}',
    './src/components/Carousel/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
