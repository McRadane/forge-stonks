import react from '@vitejs/plugin-react';
import { UserConfigExport, defineConfig } from 'vite';

export default defineConfig(({ command }) => {
  const baseConfig: UserConfigExport = {
    // base: '/forge-stonks/',
    plugins: [react()],
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
