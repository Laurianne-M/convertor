import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  envDir: path.resolve(__dirname, './'),

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