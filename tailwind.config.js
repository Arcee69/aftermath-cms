/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.html", "./src/**/*.jsx", "./src/**/*.js"],
  theme: {
    screens: {
      xs: "300px",  //360px
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    colors: {
      primary : "#3BFF81",

      secondary: "",

      tertiary: "",

      white: "#fff",
      black: "#000",

      MODAL_BACKGROUND: "rgba(11, 12, 14, 0.77)",

      GREEN:{
        _100: "#42D979",
        _200: "#6C8173"
      },

      WHITE: {
        _100: "#D9DBE1"
      },

      BLACK: {
        _100: "#3F4341",
        _200: "#242926",
        _300: "#2E3330",
        _400: "#232423",
        _500: "#B8B8B8"
      },

      RED: {
        _100: "#de0719"
      },

      GREY: {
        _100: "#EDEDED",
        _200: "#818A91",
        _300: "#EFEFEF",
        _400: "#707070"
      },


    },
  },
  plugins: [],
}