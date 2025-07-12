/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        open: ['"Open Sans"', 'sans-serif'],
        helvetica: ['"Helvetica Neue"', 'sans-serif'],
      },
      fontSize: {
        'xl': ['20px', '24px'], // [font-size, line-height]
        'label': ['16px', '24px'], // Custom size for form labels
      },
      boxShadow: {
        'custom-glow': '0 0 2px rgba(87, 87, 87, 0.83)',
        'glow-soft': '0 0 2.63px rgba(87, 87, 87, 0.37)',
      },
    },
  },
  plugins: [],
};
