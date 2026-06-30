export interface LegendItem {
  label: string;
  color: string;
}

export interface LegendProps {
  title?: string;
  items: LegendItem[];
}

export function Legend({ title = 'Legend', items }: LegendProps) {
  return (
    <div className="slot-panel">
      <p className="slot-legend-title">{title}</p>
      <ul className="slot-legend-list">
        {items.map((item) => (
          <li key={item.label} className="slot-legend-item">
            <span className="slot-legend-swatch" style={{ background: item.color }} />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
