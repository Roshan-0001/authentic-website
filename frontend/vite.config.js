import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy: {
      '/api':  {
        target: 'https://auth-u-six.vercel.app/',
        // target: 'http://localhost:3000',
        changeOrigin: true,
      },
      
    },
  },
});
