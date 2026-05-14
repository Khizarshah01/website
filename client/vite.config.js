import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const normalizeTarget = (value = '') =>
  String(value || '')
    .trim()
    .replace(/\/+$/g, '')
    .replace(/\/api$/i, '')

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiTarget = normalizeTarget(
    env.VITE_API_PROXY_TARGET ||
      env.VITE_BACKEND_URL ||
      'http://127.0.0.1:5050',
  )

  return {
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
      },
    }
  }
})
