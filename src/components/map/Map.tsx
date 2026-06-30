import { useMemo, useState, type ReactNode } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import type { LatLngExpression, Map as LeafletMap } from 'leaflet';
import { MapContext } from './MapContext';
import type { MapFeature } from './types';

export interface MapProps {
  features?: MapFeature[];
  center?: LatLngExpression;
  zoom?: number;
  minZoom?: number;
  maxZoom?: number;
  tileUrl?: string;
  tileAttribution?: string;
  topLeft?: ReactNode;
  topRight?: ReactNode;
  bottomLeft?: ReactNode;
  bottomRight?: ReactNode;
}

const DEFAULT_TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const DEFAULT_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

export function Map({
  features = [],
  center = [0, 0],
  zoom = 2,
  minZoom = 2,
  maxZoom = 18,
  tileUrl = DEFAULT_TILE_URL,
  tileAttribution = DEFAULT_ATTRIBUTION,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
}: MapProps) {
  const [map, setMap] = useState<LeafletMap | null>(null);

  const ctxValue = useMemo(() => ({ map, features }), [map, features]);

  return (
    <MapContext.Provider value={ctxValue}>
      <div className="map-root">
        <MapContainer
          center={center}
          zoom={zoom}
          minZoom={minZoom}
          maxZoom={maxZoom}
          zoomControl={false}
          ref={setMap}
        >
          <TileLayer url={tileUrl} attribution={tileAttribution} />
          {features.map((f) => (
            <CircleMarker
              key={f.id}
              center={f.position}
              radius={8}
              pathOptions={{
                color: f.color ?? '#38bdf8',
                fillColor: f.color ?? '#38bdf8',
                fillOpacity: 0.7,
                weight: 2,
              }}
            >
              {(f.label || f.value !== undefined) && (
                <Tooltip>
                  {f.label}
                  {f.value !== undefined ? ` — ${f.value}` : ''}
                </Tooltip>
              )}
            </CircleMarker>
          ))}
        </MapContainer>

        {topLeft && <div className="map-slot map-slot--top-left">{topLeft}</div>}
        {topRight && <div className="map-slot map-slot--top-right">{topRight}</div>}
        {bottomLeft && <div className="map-slot map-slot--bottom-left">{bottomLeft}</div>}
        {bottomRight && <div className="map-slot map-slot--bottom-right">{bottomRight}</div>}
      </div>
    </MapContext.Provider>
  );
}
