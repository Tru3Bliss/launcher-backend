module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        app: {
          yellow: {
            DEFAULT: '#FFAF10',
            dark: '#F97919'
          },
          blue: {
            DEFAULT: '#133295',
            dark: '#03185B'
          }
        }
      },
      spacing: {
        300: '300px',
        600: '600px'
      }
    },
  },
  plugins: [],
}
