import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ama: {
          green: '#1a6b3a',
          'green-dark': '#0d2818',
          'green-mid': '#4a6b55',
          'green-light': '#e8f5ee',
          'green-pale': '#f2f8f4',
          gold: '#c8880a',
          'gold-light': '#fff8ee',
          'gold-dark': '#a66f08',
        },
        parchment: {
          DEFAULT: '#f5f0e8',
          border: '#e8e0d0',
        },
        ink: {
          DEFAULT: '#0d2818',
          mid: '#4a6b55',
          light: '#8a9e92',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        display: ['var(--font-dm-serif)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
