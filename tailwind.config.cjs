/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      backgroundImage: {
        blur: 'url(/src/assets/blur-background.png)',
        vector: 'url(/src/assets/vector.svg)',
      },
      colors: {
        primary: '#FFC323',
        secondary: '#FF3D6E'
      },
      animation: {
        'bounce-normal': 'bounce 10s linear infinite',
        'bounce-slow': 'bounce 14s linear infinite',
        'bounce-slower': 'bounce 20s linear infinite',
        'bounce-slowest': 'bounce 24s linear infinite',
      },
      screens: {
        'xs': '320px'
      }
    },
  },
  plugins: [],
}
