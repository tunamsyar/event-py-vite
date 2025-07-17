import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
//
const allowedHost = 'stellar-sparkle-production.up.railway.app';
export default defineConfig({
  server: {
    host: true, // allow external access
    allowedHosts: [allowedHost], // <- add this line
  },
  plugins: [react()],
})
