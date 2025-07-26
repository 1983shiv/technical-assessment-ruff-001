// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ✅ Import Vitest types
import type { UserConfigExport } from 'vite';
import type { ViteUserConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
} satisfies UserConfigExport & ViteUserConfig);
