import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        1728: "1728px",
        'sc-1480': "1480px",
        'sc-1390' : "1390px",
      },
      colors: {
        tabHo: '#171717',
        tabActiveHo: "#28292F",
        cardHo: 'rgba(54, 60, 67, 1)',
        textHo: '#969696',
        hrHo: '#363C43',
        blankHo: "#616161d1",
        bBlankHo: "#96bee7",

      },
      boxShadow: {
        'hr-shadow': '0 4px 4px rgba(0, 0, 0, 0.33)',
        'sm-btn-shadow': '4px 5px 30px 5px rgba(16, 18, 19, 1), -5px -3px 30px -10px rgba(150, 190, 231, 1)',
        'active-tab-shadow': '5px 23px 38px 5px #000000',
        'custom-main': '10px 10px 40px 10px rgba(0, 0, 0, 0.5)',
        'custom-card': '0 10px 15px -3px rgba(0, 0, 0, 0.25), 0 4px 6px -4px rgba(0, 0, 0, 0.25)',
        'custom-combined-btn': 'inset 0 3.26px 3.26px rgba(255, 255, 255, 0.15), inset 0 0 48.91px rgba(255, 255, 255, 0.05), 9px 10px 7.1px rgba(0, 0, 0, 0.4), -0.5px -0.5px 6.9px rgba(255, 255, 255, 0.25)'
      },
      backgroundImage: {
        'hr-gradient': 'linear-gradient(to right, rgba(40, 40, 40, 1) 10%, rgba(248, 248, 248, 0.1) 10%, rgba(255, 255, 255, 0.05) 5%)',
        'sm-btn-gradient': 'linear-gradient(to right, rgba(48, 52, 57, 1), rgba(22, 23, 24, 1))',
        'custom-main-gradient': 'linear-gradient(to bottom, rgba(55, 62, 68, 1), rgba(25, 27, 31, 1))',
      },
      fontFamily: {
        fontSans: ["var(--font-sans)"],
        poppins: ["var(--font-poppins)"],
        plusJak: ["var(--font-plusJak)"],
      },
    },
  },
  plugins: [
    nextui(),
  ],
};
export default config;
