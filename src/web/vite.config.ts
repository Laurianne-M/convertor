import { defineConfig } from 'vite';

// Production build configuration for Firebase Hosting
export default defineConfig({
  server: {
    allowedHosts: ['.internal.jabaridash.com'],
    host: true, 
  },
  build: {
    outDir: 'build',
    emptyOutDir: true,
  },
});