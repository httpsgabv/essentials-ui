import type { Meta, StoryObj } from '@storybook/react';
import { Map } from './Map';
import { Caption } from './slots/Caption';
import { ZoomControls } from './slots/ZoomControls';
import { Summary } from './slots/Summary';
import { Legend } from './slots/Legend';
import type { MapFeature } from './types';

const SAMPLE_FEATURES: MapFeature[] = [
  { id: 1, position: [48.8566, 2.3522], label: 'Paris', value: 2161, color: '#38bdf8' },
  { id: 2, position: [51.5074, -0.1278], label: 'London', value: 3975, color: '#f472b6' },
  { id: 3, position: [40.4168, -3.7038], label: 'Madrid', value: 6751, color: '#a78bfa' },
  { id: 4, position: [52.52, 13.405], label: 'Berlin', value: 1847, color: '#34d399' },
  { id: 5, position: [41.9028, 12.4964], label: 'Rome', value: 4342, color: '#fb923c' },
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

export const EmptyMap: Story = {
  args: {
    center: [20, 0],
    zoom: 2,
  },
};
