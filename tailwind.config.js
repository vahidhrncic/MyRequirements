// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./Background.html"], // Oder entsprechend anpassen
  theme: {
    extend: {
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            opacity: '0.4',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '1',
            transform: 'scale(1.3)',
          },
        },
        // Optionale leichte Drift-Animation
        'firefly-drift': {
          '0%, 100%': {
            transform: 'translate(0px, 0px)',
          },
          '50%': {
            transform: 'translate(5px, -5px)',
          },
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        // Optionale Drift-Animation:
        'firefly-drift': 'firefly-drift 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
