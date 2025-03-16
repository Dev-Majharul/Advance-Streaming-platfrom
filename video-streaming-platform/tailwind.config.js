/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cyberpunk color palette
        'cyber-black': '#0d0d0e',
        'cyber-darkgray': '#16161a',
        'cyber-gray': '#242629',
      },
      fontFamily: {
        'sans': ['Rajdhani', 'sans-serif'],
        'display': ['Orbitron', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'fadeIn': 'fadeIn 0.3s ease-in-out',
        'slideUp': 'slideUp 0.4s ease-in-out',
      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 5px #00b4fc, 0 0 10px #00b4fc' },
          '100%': { textShadow: '0 0 10px #00b4fc, 0 0 20px #00b4fc, 0 0 30px #00b4fc' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      }
    },
  },
  plugins: [],
} 