import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from "path";
import commonjs from '@rollup/plugin-commonjs';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),tailwindcss(),commonjs()
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
})
