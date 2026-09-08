import { defineConfig } from 'vite';
import path from 'path';

// Production build configuration for Firebase Hosting
export default defineConfig({
  envDir: path.resolve(__dirname, '../../'),
  server: {
    allowedHosts: ['.internal.jabaridash.com'],
    host: true, 
  },
  build: {
    outDir: 'build',
    emptyOutDir: true,
  },
});