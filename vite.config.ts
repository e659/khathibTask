import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/khathibTask",
  server: {
    proxy: {
      '/admin': {
        target: 'https://khatib-law-v1-3185dfe428a5.herokuapp.com',
        changeOrigin: true,  // Change the origin of the request
        rewrite: (path) => path.replace(/^\/admin/, ''), // Optionally rewrite the path
      },
    },
  },
})

