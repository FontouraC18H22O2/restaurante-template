import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Vite + React + Tailwind (v4, sem necessidade de tailwind.config.js/postcss.config.js)
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
