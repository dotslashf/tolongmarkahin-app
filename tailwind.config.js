module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        twitter: {
          primary: '#3498DB',
          secondary: '#F1C40F',
          accent: '#34495E',
          neutral: '#2D2131',
          'base-100': '#ECF0F1',
        },
      },
    ],
  },
};
