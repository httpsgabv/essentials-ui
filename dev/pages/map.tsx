import 'leaflet/dist/leaflet.css';
import { Map, Caption, ZoomControls, Summary, Legend, StatusLegend } from '@/index';
import type { MapFeature } from '@/index';

const FEATURES: MapFeature[] = [
  { id: 1, position: [48.8566, 2.3522], label: 'Paris', value: 2161, color: '#38bdf8',  markerVariant: "pin" },
  { id: 2, position: [51.5074, -0.1278], label: 'London', value: 3975, color: '#f472b6',  markerVariant: "pin" },
  { id: 3, position: [40.4168, -3.7038], label: 'Madrid', value: 6751, color: '#a78bfa',  markerVariant: "pin" },
  { id: 4, position: [52.52, 13.405], label: 'Berlin', value: 1847, color: '#34d399',  markerVariant: "pin" },
  { id: 5, position: [41.9028, 12.4964], label: 'Rome', value: 4342, color: '#fb923c', markerVariant: "pin" },
];

const EUROPE: [number, number] = [50, 10];

const SILO_FEATURES: MapFeature[] = [
  {
    id: 1,
    position: [48.8566, 2.3522],
    label: '51-VACARIA 0%',
    color: '#38bdf8',
    tooltip: [
      { label: 'Capacidade estática', value: '12.000 Ton', group: 'estoque' },
      { label: 'Estoque físico', value: '0 Ton', group: 'estoque' },
      { label: 'Meta Receb.', value: '5.250 Ton', group: 'recebimento' },
      { label: 'Recebido', value: '5.287 Ton (101%)', group: 'recebimento' },
      { label: 'Excedente', value: '-6.750 Ton', group: 'recebimento' },
      { label: 'Expedido', value: '-5.287 Ton (78%)', group: 'expedicao' },
      { label: 'A expedir', value: '0 Ton', group: 'expedicao' },
    ],
  },
];

export function MapPage() {
  return (
    <main style={{ padding: 24, display: 'grid', gap: 24 }}>
      <section style={{ display: 'grid', gap: 8 }}>
        <h2>Map — with all slots</h2>
        <div style={{ height: 480 }}>
          <Map
            center={EUROPE}
            zoom={4}
            features={FEATURES}
            topLeft={<Caption title="European Cities" subtitle="Population in thousands" />}
            topRight={<ZoomControls />}
            bottomLeft={
              <Legend
                title="City"
                items={[
                  { label: 'Paris', color: '#38bdf8' },
                  { label: 'London', color: '#f472b6' },
                  { label: 'Madrid', color: '#a78bfa' },
                  { label: 'Berlin', color: '#34d399' },
                  { label: 'Rome', color: '#fb923c' },
                ]}
              />
            }
            bottomRight={<Summary label="Total Population" attribute="value" />}
          />
        </div>
      </section>

      <section style={{ display: 'grid', gap: 8 }}>
        <h2>Map — with all slots</h2>
        <div style={{ height: 480 }}>
          <Map
            center={EUROPE}
            zoom={4}
            features={FEATURES}
            topLeft={<Caption title="European Cities" />}
            topRight={<ZoomControls />}
            bottomLeft={
              <StatusLegend
                title='Status da meta'
                reachedLabel='Atingida (>=100%)'
                progressLabel='Em progresso (60-99%)'
                belowLabel='Abaixo (<60%)'
                sizeLabel='Tamanho = meta (Kg)'
              />
            }
            bottomRight={<Summary label="Total Population" attribute="value" subtitle='de 118,5 mi Kg (meta)' />}
          />
        </div>
      </section>

      <section style={{ display: 'grid', gap: 8 }}>
        <h2>Map — structured tooltip</h2>
        <div style={{ height: 420 }}>
          <Map
            center={[48.8566, 2.3522]}
            zoom={10}
            features={SILO_FEATURES}
            topLeft={<Caption title="Silos" subtitle="Passe o mouse sobre o marcador" />}
          />
        </div>
      </section>

      <section style={{ display: 'grid', gap: 8 }}>
        <h2>Map — empty</h2>
        <div style={{ height: 320 }}>
          <Map center={[20, 0]} zoom={2} />
        </div>
      </section>
    </main>
  );
}
