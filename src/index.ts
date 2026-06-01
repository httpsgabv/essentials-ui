// Public package surface. Every component is re-exported here so consumers do
// `import { Button } from '@essentials/ui'` and pass the matching props.

export * from './components/button';
export * from './components/avatar';
export * from './components/combobox';
export * from './components/data-table';
export * from './components/chip';

// Ports & adapters primitives, for projects defining their own adapters.
export type { Adapter } from './core';
export { bindAdapter, cn } from './core';
