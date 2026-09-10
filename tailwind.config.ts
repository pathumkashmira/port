import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0B0E14',
        surface: {
          DEFAULT: '#111520',
          raised: '#171C2B',
          highlight: '#1E2538',
          glass: 'rgba(17, 21, 32, 0.72)',
          border: 'rgba(255, 255, 255, 0.09)',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E5C378',
          dark: '#A68724',
          muted: '#8B7322',
        },
        accent: {
          glow: '#38BDF8',
          cyan: '#38BDF8',
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#F43F5E',
        },
        titanium: '#94A3B8',
        aluminum: '#CBD5E1',
        slate: {
          950: '#0B0E14',
          900: '#111520',
          850: '#151A27',
          800: '#1C2333',
        },
      },
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
