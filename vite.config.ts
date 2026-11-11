import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Relative base so the build works from any host path (Vercel, Netlify, GitHub Pages, a sub-folder).
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    // three.js is lazy-loaded with the hero scene, after first paint.
    chunkSizeWarningLimit: 1000,
  },
})
