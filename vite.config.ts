import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

export default defineConfig({
  root: 'showcase',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@mori': resolve(__dirname, 'src') },
  },
  build: {
    outDir: '../dist/showcase',
    emptyOutDir: true,
  },
})
