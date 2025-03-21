/// <reference types="vitest/config" />

import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, UserConfigExport } from 'vite';

export default defineConfig(({ command }) => {
  const baseConfig: UserConfigExport = {
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
    // base: '/forge-stonks/',
    resolve: {
      alias: {
        '@shared': path.resolve(__dirname, './src/shared'),
        '@ui': path.resolve(__dirname, './src/ui'),
        '@worker': path.resolve(__dirname, './src/worker')
      }
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./vitest-setup.ts']
    },
    worker: {
      format: 'es'
    }
  } as UserConfigExport;
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
