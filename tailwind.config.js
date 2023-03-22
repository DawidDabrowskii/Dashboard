/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        latoRegular: 'Lato-Regular',
        latoBold: 'Lato-Bold',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
