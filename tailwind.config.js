const { nextui } = require('@nextui-org/theme');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(autocomplete|modal|navbar|button|ripple|spinner|input|listbox|divider|popover|scroll-shadow).js"
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['CustomFont', 'sans-serif'], // Adding custom font family
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({
    prefix: "nextui",
    addCommonColors: false,
    defaultTheme: "dark",
    defaultExtendTheme: "dark",
    layout: {},
  })],
}
