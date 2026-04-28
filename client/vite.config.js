import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    proxy: {
      "/api": {
        target: "https://agro-connect-8yjz.onrender.com",
        changeOrigin: true,
        secure: false,
      },
      "/payment": {
        target: "https://agro-connect-8yjz.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },

})