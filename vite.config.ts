/// <reference types="vitest/config" />
import { existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

// Every folder under src/components/ with an index.ts is a public component
// entry point — discovered here (instead of hardcoded) so adding a component
// only means adding its folder; nothing in this config needs editing.
// `scripts/sync-exports.mjs` mirrors this same discovery into package.json's
// `exports` map, and both must be run to publish a new component correctly.
const componentsDir = resolve(__dirname, 'src/components');
const componentEntries = Object.fromEntries(
  readdirSync(componentsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => existsSync(resolve(componentsDir, name, 'index.ts')))
    .map((name) => [name, resolve(componentsDir, name, 'index.ts')]),
);

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
    // Vite's lib mode extracts CSS to standalone files but strips the
    // `import './x.css'` statements from the JS output. This plugin puts
    // them back so each component chunk re-imports its own CSS at runtime —
    // consumers get styles automatically, without a manual stylesheet import.
    libInjectCss(),
  ],
  build: {
    cssCodeSplit: true,
    sourcemap: true,
    lib: {
      entry: {
        'essentials-ui': resolve(__dirname, 'src/index.ts'),
        ...componentEntries,
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
      output: {
        // Without this, Rollup groups a component's internal modules into
        // shared chunks named after whichever module happens to anchor them
        // (e.g. combobox's CSS ends up in a file called `options.adapter.css`).
        // Pin each component's own files to a chunk named after the
        // component, so the emitted `dist/<name>.css` matches `dist/<name>.js`.
        manualChunks(id) {
          if (/[\\/]src[\\/]styles[\\/]tokens\.css$/.test(id)) return 'tokens';
          if (/[\\/]src[\\/]core[\\/]/.test(id)) return 'core';
          const match = /[\\/]src[\\/]components[\\/]([a-z-]+)[\\/]/.exec(id);
          if (match) return `${match[1]}-lib`;
        },
      },
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
