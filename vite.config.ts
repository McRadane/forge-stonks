import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => {
  const baseConfig = {
    base: '/forge-stonks/',
    plugins: [react()]
  };
  if (command === 'serve') {
    return {
      ...baseConfig,
      define: {
        global: {}
      }
    };
  } else {
    // command === 'build'
    return {
      ...baseConfig
    };
  }
});
