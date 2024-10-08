import { nextui } from "@nextui-org/react";



/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        manrope: ['manrope', 'sans-serif'],
        alata: ['alata', 'sans-serif'],
      },
      colors: {

        primary: {
          DEFAULT: '#C149C3',
        },
        // colores de app
        "primaryColor": "hsl(277, 62%, 51%)",
        "secondaryColor": "hsl(299, 51%, 53%)",
        "menuColor-1": "hsl(184, 65%, 52%)",
        "menuColor-2": "hsl(83, 78%, 51%)",
        "menuColor-3": "hsl(43, 92%, 57%)",
        "menuColor-4": "hsl(353, 100%, 81%)",
        "baseColor": "hsl(0, 0%, 90%)",

        //text
        "whiteText": "hsl(0, 3%, 94%)",
        "blackText": "hsl(0, 0%, 15%)",
        "titleColor": "hsl(18, 100%, 67%)",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      addCommonColors: true,
    }
    ),
  ],
}

