import { lazy, Suspense } from 'react';
import type { MapProps } from './map.types';

// react-leaflet/leaflet touch `window` at module-evaluation time, so the
// implementation is dynamically imported: importing this file (or the
// package root, which re-exports it) must stay safe in non-browser contexts
// (SSR, Node scripts, tests) even when the Map is never rendered.
const MapImpl = lazy(() => import('./map-impl').then((m) => ({ default: m.Map })));

export function Map(props: MapProps) {
  return (
    <Suspense fallback={null}>
      <MapImpl {...props} />
    </Suspense>
  );
}
