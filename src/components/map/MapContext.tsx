import { createContext, useContext } from 'react';
import type { Map as LeafletMap } from 'leaflet';
import type { MapFeature } from './types';

export interface MapContextValue {
  map: LeafletMap | null;
  features: MapFeature[];
}

export const MapContext = createContext<MapContextValue | null>(null);

export function useMapSlot(): MapContextValue {
  const ctx = useContext(MapContext);
  if (!ctx) {
    throw new Error('Map slot components must be rendered inside <Map>.');
  }
  return ctx;
}
