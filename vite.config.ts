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
      entry: {
        'essentials-ui': resolve(__dirname, 'src/index.ts'),
        button: resolve(__dirname, 'src/components/button/index.ts'),
        avatar: resolve(__dirname, 'src/components/avatar/index.ts'),
        combobox: resolve(__dirname, 'src/components/combobox/index.ts'),
        'data-table': resolve(__dirname, 'src/components/data-table/index.ts'),
        map: resolve(__dirname, 'src/components/map/index.ts'),
      },
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
        'leaflet',
        /^react-leaflet($|\/)/,
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
