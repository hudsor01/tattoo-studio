/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'tattoo-red': '#d62828',
        'tattoo-red-dark': '#b21e1e',
        'tattoo-black': '#0a0a0a',
        'tattoo-white': '#ffffff',
        'tattoo-blue': '#4361ee',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        glow: '0 0 15px 5px rgba(255, 255, 255, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      textShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.25)',
        DEFAULT: '0 2px 4px rgba(0, 0, 0, 0.5)',
        lg: '0 8px 16px rgba(0, 0, 0, 0.75)',
        glow: '0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.3)',
        'red-glow': '0 0 5px rgba(214, 40, 40, 0.5), 0 0 10px rgba(214, 40, 40, 0.3)',
      },
      fontFamily: {
        script: ['Pacifico', 'cursive'],
        display: ['Bebas Neue', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    // Text shadow implementation
    function ({ addUtilities, theme }) {
      const textShadows = theme('textShadow', {})
      const utilities = Object.entries(textShadows).map(([key, value]) => {
        return {
          [`.text-shadow${key === 'DEFAULT' ? '' : `-${key}`}`]: {
            textShadow: value,
          },
        }
      })
      addUtilities(utilities)
    },
  ],
}
