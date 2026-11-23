/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        accent: { DEFAULT: '#276EF6', soft: '#EAF1FE', ink: '#1B4FB4' },
      },
      fontFamily: {
        sans: ['"Dastkhat Bar"', 'Tahoma', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
