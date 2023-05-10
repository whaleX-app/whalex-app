/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'TechnaSans',
        myriad: 'MyriadPro-Bold',
      },
      fontSize: {
        xs: 10,
        sm: 12,
      },
    },
    colors: {
      black: '#000000',
      white: '#ffffff',
      primary: '#ff5600',
      success: {
        50: '#2aff00',
        100: '#03bf00',
      },
      info: {
        50: '#00ccff',
        100: '#0096bc',
      },
      danger: {
        50: '#ff0000',
        100: '#db1c15',
      },
      warning: {
        50: '#afb513',
        100: '#8d7a12',
      },
      surface: {
        50: '#2f2f2f',
        100: '#101010',
      },
      gray: {
        50: '#cdcdcd',
        100: '#aaaaaa',
        200: '#525252',
      },
      gradient: {
        primary: ['#e85100', '#e73600'],
      },
    },
  },
  plugins: [],
};
