/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'editor-bg': '#1e1e1e',
        'editor-fg': '#d4d4d4',
        'accent': '#007fd4',
        'success': '#4caf50',
        'error': '#f44336',
        'warning': '#ff9800',
      }
    },
  },
  plugins: [],
}
