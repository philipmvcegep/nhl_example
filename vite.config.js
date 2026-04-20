import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // Use this instead of react-refresh

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/nhl-api': {
        target: 'https://api-web.nhle.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/nhl-api/, ''),
      },
    },
  },
})