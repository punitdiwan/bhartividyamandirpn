module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'Admission': "url('/images/ad_lower.jpeg')",
        'Facilities': "url('/images/ray.JPG')",
        'header': "url('https://bhartividyamandirpn.com/images/fw.png')",
      },
      colors: {
        footers: {
          default: '#2f2629',
        },
        footerend: {
          default: '#7c2f4f',
        },
      },
    },
  },
  plugins: [],
}
