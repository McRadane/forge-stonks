/// <reference types="vitest/config" />

import react from '@vitejs/plugin-react';
import { defineConfig, UserConfigExport } from 'vite';

export default defineConfig(({ command }) => {
  const baseConfig: UserConfigExport = {
    base: '/forge-stonks/',
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            mui: ['@mui/material', '@mui/icons-material']
          }
        }
      }
    },
    plugins: [react()],
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./vitest-setup.ts']
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
