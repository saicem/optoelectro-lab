/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        'lab-bg': '#0a0e17',
        'lab-surface': '#1a2332',
        'lab-border': '#334155',
        'lab-text': '#e2e8f0',
        'lab-muted': '#94a3b8',
        'laser-red': '#ff3366',
        'laser-green': '#00ff88',
        'laser-blue': '#3366ff',
        'laser-cyan': '#00d4ff',
        'laser-purple': '#a855f7',
        'laser-orange': '#ff8800',
      },
      fontFamily: {
        display: ['"Orbitron"', '"Rajdhani"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-red': '0 0 20px rgba(255, 51, 102, 0.5)',
        'glow-green': '0 0 20px rgba(0, 255, 136, 0.5)',
        'glow-blue': '0 0 20px rgba(51, 102, 255, 0.5)',
        'glow-cyan': '0 0 20px rgba(0, 212, 255, 0.5)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'wave': 'wave 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'wave': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
};
