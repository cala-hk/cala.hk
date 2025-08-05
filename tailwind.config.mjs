/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'primary': '#d0137e',
        'secondary': '#662c93',
        'text-color': '#743088',
        'text-light': '#982587',
        'bg-color': '#ffffff',
        'bg-alt-color': '#f8f9fa',
        'border-color': '#e9ecef',
        'footer-bg': '#2c3e50',
        'footer-text': '#bdc3c7',
        'link-color': '#0056b3',
        'link-hover-color': '#003d82',
        'button-bg': '#0056b3',
        'button-text': '#ffffff',
        'button-hover-bg': '#003d82',
      },
      fontFamily: {},
      container: {
        center: true,
        padding: '1rem',
        screens: {
          lg: '1140px',
        },
      },
    },
  },
  plugins: [],
};