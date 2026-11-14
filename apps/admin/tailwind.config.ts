import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0B192C',
          800: '#1E3E62',
          700: '#1F3578',
          600: '#2A4391',
          500: '#3B5CC4',
        },
        ocean: {
          500: '#008DDA',
          400: '#41C9E2',
          100: '#ACE2E1',
          50: '#F7EEDD',
        },
        maritime: {
          dark: '#0f172a',
          surface: '#1e293b',
          border: '#334155',
        }
      },
    },
  },
  plugins: [],
};

export default config;
