module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', 'Component/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  // purge: ['Component/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  mode: "jit",
  theme: {
    extend: {
      backgroundImage: {
        'Admission': "url('/images/ad_lower.jpeg')",
        'Facilities': "url('/images/ray.JPG')", 
      },
      colors: {
        footers: {
          default: "#2f2629",
        },
        footerend: {
          default: "#7c2f4f",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
  ],
};