import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    devSourcemap: true
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"], // Ensure JSX is recognized
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['swiper', 'react-toastify', 'react-modal-video', 'react-photo-view'],
          'animation-vendor': ['gsap', '@react-spring/web', 'animate.css'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
