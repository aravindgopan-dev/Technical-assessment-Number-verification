import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://ec2-52-23-201-90.compute-1.amazonaws.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
