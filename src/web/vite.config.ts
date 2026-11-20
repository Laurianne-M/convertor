import { defineConfig } from 'vite';

export default defineConfig({
  // Server options for local development & internal proxying
  server: {
    allowedHosts: ['.internal.jabaridash.com'],
    host: true,
  },

  build: {
    outDir: 'build',
    emptyOutDir: true,
  },
});