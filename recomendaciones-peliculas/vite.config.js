import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // Importante para Render
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})