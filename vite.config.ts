import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/forge-stonks/',
  /* define: {
    global: {},
    'process.env': {}
  }, */
  plugins: [react()]
});
