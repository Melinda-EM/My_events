module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx}",
  ],
  theme: {
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '5.5rem',
      '5xl': '12rem',
    },
    borderWidth: {
      '8': '40px',
    },
    extend: {
      maxWidth: {
        '3xl': '80rem',
      },
      marginRight: {
        '100': '103rem',
      },
      colors: {
        blue: "#8FC8F7",
        red: "#F5231A",
        purple: "#B2B9E1",
        "dark-gray": "#757575",
        "opaque-black": "rgba(0, 0, 0, 0.35)",
        "light-blue": "#5537D1",
        "cobalt": "#4DABF5",
        "dark-purple": "#2d102c",
      },
      backgroundImage: {
        'validate' :
        'linear-gradient(to right, rgb(16, 185, 129), rgb(101, 163, 13))',
        'redish':
        'linear-gradient(to right, rgb(239, 68, 68), rgb(153, 27, 27))',
        'gradient-rainblue':
          "linear-gradient(90deg, #24CBFF 14.53%, #FC59FF 69.36%, #FFBD0C 117.73%)",
        'film': "url('/src/assets/banderole.jpg')",
        'flou' : "url('/src/assets/film.jpg')",
        'dark':
          "radial-gradient(at center center, rgb(55, 65, 81), rgb(17, 24, 39), rgb(0, 0, 0))",
        'purplize':
          "linear-gradient(to right, rgb(91, 33, 182), rgb(147, 51, 234), rgb(79, 70, 229))"
      },
      backgroundRepeat: {
        'no-repeat': 'no-repeat',
      },
      fontFamily: {
        play: ["Play", "serif"],
        outfit: ["Outfit", "serif"],
        handjet: ["Handjet", "sans-serif"],
        dancing: ["Dancing Script", "serif"],
        libre: ["Libre Baskerville", "serif"],
      },
      cursor: {
        'kernel': 'url("/src/assets/kernel.png"), auto',
        'popcorn': 'url("/src/assets/corn.png"), auto',
      },
    },
    screens: {
      xs: "480px",
      sm: "768px",
      md: "1060px",
    },
  },
  plugins: [],
};
