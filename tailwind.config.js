/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        xebia: {
          purple: '#6C1D5F',
          purpleDark: '#4A1E47',
          purpleBright: '#84117C',
          emerald: '#01AC9F',
          orange: '#FF6200',
          blueishGrey: '#F7F8FC',
          mediumGrey: '#CADCEA',
          lightGrey: '#DEDEDE',
          darkGrey: '#5A5A5A',
        },
      },
    },
  },
  plugins: [],
}
