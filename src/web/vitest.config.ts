// vite.config.js
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    environment: 'jsdom', // or 'happy-dom'
    exclude: ['**/e2e/**',
      '**/node_modules/**',
      '**/*.spec.ts',],
  },
})