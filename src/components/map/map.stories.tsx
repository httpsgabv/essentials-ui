import type { Meta, StoryObj } from '@storybook/react';
import { Map } from './map';
import { Caption } from './slots/Caption';
import { ZoomControls } from './slots/ZoomControls';
import { Summary } from './slots/Summary';
import { Legend } from './slots/Legend';
import type { MapFeature } from './map.contract';

const SAMPLE_FEATURES: MapFeature[] = [
  { id: 1, position: [48.8566, 2.3522], label: 'Paris', value: 2161, color: '#38bdf8' },
  { id: 2, position: [51.5074, -0.1278], label: 'London', value: 3975, color: '#f472b6' },
  { id: 3, position: [40.4168, -3.7038], label: 'Madrid', value: 6751, color: '#a78bfa' },
  { id: 4, position: [52.52, 13.405], label: 'Berlin', value: 1847, color: '#34d399' },
  { id: 5, position: [41.9028, 12.4964], label: 'Rome', value: 4342, color: '#fb923c' },
];

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

const EUROPE_CENTER: [number, number] = [50, 10];

const meta: Meta<typeof Map> = {
  title: 'Components/Map',
  component: Map,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Map>;

export const Default: Story = {
  args: {
    center: EUROPE_CENTER,
    zoom: 4,
  },
};

export const WithFeatures: Story = {
  args: {
    center: EUROPE_CENTER,
    zoom: 4,
    features: SAMPLE_FEATURES,
  },
};

export const WithAllSlots: Story = {
  args: {
    center: EUROPE_CENTER,
    zoom: 4,
    features: SAMPLE_FEATURES,
    topLeft: <Caption title="European Cities" subtitle="Population in thousands" />,
    topRight: <ZoomControls />,
    bottomLeft: (
      <Legend
        title="Category"
        items={[
          { label: 'City A', color: '#38bdf8' },
          { label: 'City B', color: '#f472b6' },
          { label: 'City C', color: '#a78bfa' },
        ]}
      />
    ),
    bottomRight: <Summary label="Total Population" attribute="value" />,
  },
};

export const WithCaption: Story = {
  args: {
    center: EUROPE_CENTER,
    zoom: 4,
    features: SAMPLE_FEATURES,
    topLeft: <Caption title="World Map" subtitle="Click a marker for details" />,
    topRight: <ZoomControls />,
  },
};

export const WithLegendAndSummary: Story = {
  args: {
    center: EUROPE_CENTER,
    zoom: 4,
    features: SAMPLE_FEATURES,
    bottomLeft: (
      <Legend
        items={[
          { label: 'Blue', color: '#38bdf8' },
          { label: 'Pink', color: '#f472b6' },
          { label: 'Purple', color: '#a78bfa' },
          { label: 'Green', color: '#34d399' },
          { label: 'Orange', color: '#fb923c' },
        ]}
      />
    ),
    bottomRight: <Summary label="Total" attribute="value" />,
  },
};

export const WithStructuredTooltip: Story = {
  args: {
    center: [48.8566, 2.3522],
    zoom: 10,
    features: SILO_FEATURES,
    topLeft: <Caption title="Silos" subtitle="Passe o mouse sobre o marcador" />,
  },
};

export const PinMarkers: Story = {
  args: {
    center: EUROPE_CENTER,
    zoom: 4,
    features: SAMPLE_FEATURES.map((f) => ({ ...f, markerVariant: 'pin' })),
  },
};

export const MixedMarkers: Story = {
  args: {
    center: EUROPE_CENTER,
    zoom: 4,
    features: SAMPLE_FEATURES.map((f, i) => ({
      ...f,
      markerVariant: i % 2 === 0 ? 'pin' : 'dot',
    })),
  },
};

export const EmptyMap: Story = {
  args: {
    center: [20, 0],
    zoom: 2,
  },
};
