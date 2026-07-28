import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Mirrors vite.config.ts's component discovery (every src/components/<name>/
// with an index.ts is a public entry) into package.json's `exports` map, so
// adding a component folder is enough — no export wiring by hand, and this
// stays impossible to forget to update.
const root = dirname(dirname(fileURLToPath(import.meta.url)));
const componentsDir = join(root, 'src/components');

const componentNames = readdirSync(componentsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((name) => {
    try {
      readFileSync(join(componentsDir, name, 'index.ts'));
      return true;
    } catch {
      return false;
    }
  })
  .sort();

const pkgPath = join(root, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));

pkg.exports = {
  '.': {
    types: './dist/essentials-ui.d.ts',
    import: './dist/essentials-ui.js',
    require: './dist/essentials-ui.cjs',
  },
  ...Object.fromEntries(
    componentNames.map((name) => [
      `./${name}`,
      {
        types: `./dist/${name}.d.ts`,
        import: `./dist/${name}.js`,
        require: `./dist/${name}.cjs`,
      },
    ]),
  ),
  './styles.css': './dist/styles.css',
};

writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
