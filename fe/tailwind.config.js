/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        main: ['Poppins', 'sans-serif']
      },
      width: {
        main: '1220px'
      },
      backgroundColor: {
        main: 'red',
        overlay: 'rgba(0, 0, 0, 0.5)',
      },
      colors: {
        main: 'red'
      },
      flex: {
        '2': '2 2 0%',
        '3': '3 3 0%',
        '4': '4 4 0%',
        '5': '5 5 0%',
        '6': '6 6 0%',
        '7': '7 7 0%',
        '8': '8 8 0%',
      },
      keyframes: {
        'slide-top': {
          '0%': {
            ' -webkit-transform': 'translateY(20px)',
            transform: 'translateY(20px)'
          },
          '100%': {
            '-webkit-transform': 'translateY(-10px)',
            transform: 'translateY(-10px)'
          }
        },
        'slide-right': {
          '0%': {
            ' -webkit-transform': 'translateY(-1000px)',
            transform: 'translateY(-1000px)'
          },
          '100%': {
            '-webkit-transform': 'translateY(0px)',
            transform: 'translateY(0px)'
          }
        }
      },
      animation: {
        'slide-top': 'slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'slide-right': 'slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
      }
    }
  },
  plugins: ['@tailwindcss/line-clamp', require('@tailwindcss/forms')],

}
