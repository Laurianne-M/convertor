// vite.config.js
import { defineConfig } from 'vite'
export default defineConfig({
  test: {
    environment: 'jsdom', // or 'happy-dom'
    exclude: ['tests/e2e/**'],
  },
})