import { useMemo, useState } from 'react';
import { MapContainer, Popup, TileLayer } from 'react-leaflet';
import type { Map as LeafletMap } from 'leaflet';
import { MapContext } from './context';
import { MapMarker } from './components/map-marker';
import type { MapProps } from './map.types';
import '@/styles/tokens.css';
import '@/styles/map.css';
import { MapFeatureTooltip } from './components/map-tooltip';

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
          {features.map((feature) => (
            <MapMarker key={feature.id} center={feature.position} color={feature.color} variant={feature.markerVariant}>
              {(feature.label || feature.value !== undefined || feature.tooltip?.length) && (
                <Popup
                  className={feature.tooltip?.length ? 'map-tooltip-popup' : undefined}
                  closeButton={false}
                >
                  <MapFeatureTooltip label={feature.label} value={feature.value} items={feature.tooltip} />
                </Popup>
              )}
            </MapMarker>
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
