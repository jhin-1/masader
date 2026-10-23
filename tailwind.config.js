/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        mx: {
          ink: '#091D0D',
          'ink-900': '#0B2310',
          'ink-800': '#10301A',
          'ink-700': '#18402A',
          mist: '#EFF5ED',
          'mist-50': '#F7FAF6',
          'mist-200': '#DFE9DB',
          sage: '#839085',
          leaf: '#9DCB5B',
          'leaf-600': '#7FAF3E',
          'leaf-200': '#D6EABA',
          gold: '#F4AF35',
          'gold-600': '#D9921A',
          'gold-200': '#FBE0AE',
          paper: '#FBFCF9',
        },
      },
      fontFamily: {
        display: ['"Masader Display"', 'Newsreader', 'Georgia', '"Times New Roman"', 'serif'],
        sans: ['"Masader Sans"', 'Inter', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"Masader Mono"', '"JetBrains Mono"', 'ui-monospace', '"SFMono-Regular"', 'Consolas', 'monospace'],
        arabic: ['"Masader Arabic"', 'Amiri', '"Noto Naskh Arabic"', 'serif'],
      },
      letterSpacing: {
        eyebrow: '0.18em',
      },
    },
  },
  plugins: [],
};

