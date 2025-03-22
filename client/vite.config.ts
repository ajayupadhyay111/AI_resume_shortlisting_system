import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: '/',   // Ensure correct base path
  build: {
    outDir: 'dist'
  },
  server: {
    host: true,   // Allow access over LAN
    port: 5173,   // Default Vite port
  },
  preview: {
    port: 4173,
  },
})
