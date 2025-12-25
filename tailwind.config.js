module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // your existing content paths
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': [
          'Futura', 
          'Futura PT', 
          'Futura-CondensedMedium',
          '-apple-system', 
          'BlinkMacSystemFont', 
          'Segoe UI', 
          'Roboto', 
          'Helvetica Neue', 
          'Arial', 
          'sans-serif'
        ],
      }
    },
  },
  plugins: [],
}