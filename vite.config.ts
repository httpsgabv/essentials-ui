/// <reference types="vitest/config" />
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    react(),
    dts({
      include: ['src'],
      exclude: ['**/*.test.*', '**/*.spec.*', 'src/test'],
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'EssentialsUI',
      fileName: 'essentials-ui',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // Keep React (peer dep) and the runtime deps (Base UI, cva) out of the
      // bundle so the consumer resolves a single copy of each.
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        /^@base-ui\/react($|\/)/,
        /^@phosphor-icons\/react($|\/)/,
        /^@tanstack\/react-table($|\/)/,
        'class-variance-authority',
      ],
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.test.*', 'src/test', 'src/**/index.ts'],
    },
  },
});
