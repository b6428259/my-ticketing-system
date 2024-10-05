// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Change to your repository name
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Use '@' to refer to the src directory
    },
  },
});
