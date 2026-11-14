/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      spacing: {
        '120': '30rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        background: 'hsl(var(--background, 0 0% 100%))',
        foreground: 'hsl(var(--foreground, 222.2 47.4% 11.2%))',
        muted: {
          DEFAULT: 'hsl(var(--muted, 210 40% 96.1%))',
          foreground: 'hsl(var(--muted-foreground, 215.4 16.3% 46.9%))',
        },
        card: {
          DEFAULT: 'hsl(var(--card, 0 0% 100%))',
          foreground: 'hsl(var(--card-foreground, 222.2 47.4% 11.2%))',
        },
        aruna: {
          50: '#F0F7FD',
          100: '#DDF0FC',
          200: '#BCE2FA',
          300: '#86CAF5',
          400: '#3AA7EB',
          500: '#008AE0',
          600: '#006AAF', // Warna Biru Kaos & Logo Lapangan Aruna
          700: '#00558F',
          800: '#004372',
          900: '#0A2540', // Deep Marine untuk tipografi kontras tinggi
          950: '#051628',
        },
        coral: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          500: '#F97316',
          600: '#F37125', // Aksen Jingga Fishery CTA
          700: '#C2410C',
        }
      }
    },
  },
  plugins: [],
};
