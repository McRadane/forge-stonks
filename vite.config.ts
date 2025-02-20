/// <reference types="vitest/config" />

import react from '@vitejs/plugin-react';
import { UserConfigExport, defineConfig } from 'vite';

export default defineConfig(({ command }) => {
  const baseConfig: UserConfigExport = {
    base: '/forge-stonks/',
    plugins: [react()],
    test: {
      environment: 'jsdom',
      setupFiles: ['./vitest-setup.ts'],
      globals: true
    },
    worker: {
      format: 'es'
    }
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
