import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/forge-stonks/',
  plugins: [react()],
  /*define: {
    'process.env': {},
    global: {}
  }*/
});
