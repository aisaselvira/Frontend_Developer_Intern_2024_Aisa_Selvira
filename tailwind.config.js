/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundAttachment: {
        'fixed': 'fixed',
      },
      fontFamily: {
        'body': ['-apple-system', 'BlinkMacSystemFont', '\'Segoe UI\'', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', '\'Helvetica Neue\'', 'sans-serif'],
        'code': ['source-code-pro', 'Menlo', 'Monaco', 'Consolas', '\'Courier New\'', 'monospace'],
      },
    },
  },
  plugins: [
    function({ addUtilities, addBase }) {
      const newUtilities = {
        '.parallax-bg': {
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          'background-size': 'cover',
          'background-attachment': 'fixed',
          'background-position': 'center',
          'z-index': '-1',
        },
        '.custom-slant': {
          position: 'absolute',
          bottom: '-305px',
          left: '0',
          width: '100%',
          height: '350px',
          background: 'white',
          transform: 'skewY(-9deg)',
          'transform-origin': 'bottom left',
          'z-index': '0',
        },
        '.truncate-3-lines': {
          display: '-webkit-box',
          '-webkit-line-clamp': '3',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
          'text-overflow': 'ellipsis',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])

      const baseStyles = {
        'body': {
          margin: '0',
          'font-family': '-apple-system, BlinkMacSystemFont, \'Segoe UI\', \'Roboto\', \'Oxygen\', \'Ubuntu\', \'Cantarell\', \'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif',
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
        },
        'code': {
          'font-family': 'source-code-pro, Menlo, Monaco, Consolas, \'Courier New\', monospace',
        },
      }
      addBase(baseStyles)
    }
  ],
}
