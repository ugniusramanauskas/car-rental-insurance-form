/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'xl': ['20px', '24px'], // [font-size, line-height]
        'label': ['16px', '24px'], // Custom size for form labels
      },
    },
  },
  plugins: [],
};
