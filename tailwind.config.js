/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        // 'green': '0 4px 6px -1px rgb(177, 242, 186)',
        'blue': '20px 20px 1px -1px rgba(163, 215, 255,.1)',
        'green': '20px 20px 1px -1px rgba(177, 242, 186,.1)',
      },
      textShadow: {
        'default': '2px 2px 4px rgba(0, 0, 0, 0.1)',
        'md': '3px 3px 5px rgba(0, 0, 0, 0.6)',
        'lg': '4px 4px 6px rgba(0, 0, 0, 0.8)',
      }
    },
  },
  plugins: [],
}

