/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       fontFamily: {
         body: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Oxygen', 'Cantarell', '"Open Sans"', '"Helvetica Neue"', 'sans-serif'],
        emoji: ['Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
