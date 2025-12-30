import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        earth: {
          50: '#faf7f2',
          100: '#f5ede0',
          200: '#ead9c1',
          300: '#ddc09a',
          400: '#cfa372',
          500: '#b8874f',
          600: '#9d6d3e',
          700: '#7f5635',
          800: '#684730',
          900: '#573d2a',
        },
        green: {
          50: '#f0f9f4',
          100: '#dcf2e3',
          200: '#bce4ca',
          300: '#8fcea8',
          400: '#5bb07d',
          500: '#38915c',
          600: '#2a7349',
          700: '#245c3c',
          800: '#204a33',
          900: '#1c3e2b',
        },
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
export default config

