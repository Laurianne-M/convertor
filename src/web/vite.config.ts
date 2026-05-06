import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    allowedHosts: ['.internal.jabaridash.com'],
    host: true, 
  },
});