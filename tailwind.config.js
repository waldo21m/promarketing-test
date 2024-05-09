/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'pm-blue-900': '#091b50',
        'pm-blue-500': '#3c4d82',
        'pm-amber-500': '#cfac48',
        'pm-amber-500a': '#e3a70c',
        'pm-gray-100': '#e0e4ef',
        'pm-gray-100a': '#f6f7fA',
        'pm-neutral-200': '#909090',
      },
      maxHeight: {
        '4/5': '80vh',
        '3/5': '60vh',
      },
      minHeight: {
        'auto': 'auto',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

