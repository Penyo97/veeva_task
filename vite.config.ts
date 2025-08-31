import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://technical-services-x-page-minicase---adam.veevavault.com',
        changeOrigin: true,
        secure: true
      }
    }
  }
})
