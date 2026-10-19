import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/marcusnetoo/',
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'motion-vendor': ['framer-motion', 'gsap', 'lenis'],
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'icons-vendor': [
            '@fortawesome/react-fontawesome',
            '@fortawesome/fontawesome-svg-core',
            '@fortawesome/free-solid-svg-icons',
            '@fortawesome/free-brands-svg-icons',
          ],
        },
      },
    },
  },
})
