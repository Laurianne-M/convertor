import { defineConfig } from 'vite';
import path from 'path';


export default defineConfig(({ mode: _mode }) => {
  return {
    // Tells Vite to look in the workspace root for .env, .env.dev, .env.prod, etc.
    envDir: path.resolve(__dirname, '../../'),
    
    // Server options for local development & internal proxying
    server: {
      allowedHosts: ['.internal.jabaridash.com'],
      host: true,
    },

    // Production build configuration for Firebase Hosting
    build: {
      outDir: 'build',
      emptyOutDir: true,
    },
  };
});