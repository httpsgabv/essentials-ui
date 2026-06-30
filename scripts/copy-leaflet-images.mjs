import { cpSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// leaflet.css references its marker/layer icons as relative url(images/...),
// so dist/styles.css needs a sibling dist/images/ with the same files.
const root = dirname(dirname(fileURLToPath(import.meta.url)));

cpSync(join(root, 'node_modules/leaflet/dist/images'), join(root, 'dist/images'), {
  recursive: true,
});
