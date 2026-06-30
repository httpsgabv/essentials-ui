import { useEffect, useState } from 'react';
import { useMapSlot } from '../map-context';

export function ZoomControls() {
  const { map } = useMapSlot();
  const [zoom, setZoom] = useState<number | null>(null);

  useEffect(() => {
    if (!map) return;
    setZoom(map.getZoom());
    const onZoom = () => setZoom(map.getZoom());
    map.on('zoomend', onZoom);
    return () => {
      map.off('zoomend', onZoom);
    };
  }, [map]);

  const atMin = zoom !== null && zoom <= map!.getMinZoom();
  const atMax = zoom !== null && zoom >= map!.getMaxZoom();

  return (
    <div className="slot-panel slot-zoom">
      <button
        type="button"
        aria-label="Zoom in"
        onClick={() => map?.zoomIn()}
        disabled={!map || atMax}
      >
        +
      </button>
      <button
        type="button"
        aria-label="Zoom out"
        onClick={() => map?.zoomOut()}
        disabled={!map || atMin}
      >
        −
      </button>
    </div>
  );
}
