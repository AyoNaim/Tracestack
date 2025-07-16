/** @type {import('tailwindcss').Config} */
export default {
    content: [
    // Path for files within the 'web' app
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Path for files in shared UI packages (adjust if your package names differ)
    // This assumes 'packages/ui' is at the same level as 'apps/web'
    '../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}',
    // Add more lines here if you have other packages with Tailwind components, e.g.:
    // '../../packages/another-shared-lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

