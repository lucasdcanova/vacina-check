/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          'dark-blue': '#15335e', // Azul Escuro Principal
          'medium-blue': '#17497e', // Azul Médio
          'blue': '#0072a2', // Azul
          'cyan': '#6de0e4', // Ciano/Turquesa
          'dark-gray': '#464753', // Cinza Escuro
          'medium-gray': '#8f9498', // Cinza Médio
          'light': '#f0f9ff', // Mantendo um light genérico para fundos muito claros
        }
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(to right, #6de0e4 0%, #0072a2 30%, #0b4780 100%)',
      },
      fontFamily: {
        sans: ['var(--font-cabin)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
