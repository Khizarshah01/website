import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const apiTarget = process.env.VITE_API_PROXY_TARGET || 'http://127.0.0.1:5000'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react-quill-new'],
  },
  build: {
    sourcemap: false,
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: apiTarget,
        changeOrigin: true,
      },
      '/uploads': {
        target: apiTarget,
        changeOrigin: true,
      },
    }
  }
})
