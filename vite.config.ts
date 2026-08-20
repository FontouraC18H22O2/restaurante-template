import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Vite + React + Tailwind (v4, sem necessidade de tailwind.config.js/postcss.config.js)
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Em desenvolvimento, corre "vercel dev" à parte (porta 3000 por omissão)
      // para servir as funções em /api; o "npm run dev" do frontend reencaminha
      // os pedidos para lá. Em produção a Vercel trata disto automaticamente.
      '/api': 'http://localhost:3000',
    },
  },
})
