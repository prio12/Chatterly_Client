/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // Disable Tailwind dark mode completely
  theme: { extend: {} },
  plugins: [daisyui], // ✅ use imported daisyui here
  daisyui: {
    themes: ['light'],
    darkTheme: 'light',
    styled: true,
    base: true,
    utils: true,
    logs: false,
  },
};
