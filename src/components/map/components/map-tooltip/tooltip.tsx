import type { MapFeatureTooltipItem } from '../../map.contract';

export interface MapTooltipProps {
  /** Item name, shown bold at the top of the tooltip. */
  title: string;
  /** Rows shown below the title. Consecutive rows sharing a `group` are
   *  clustered together, with a divider before the next group. */
  items?: MapFeatureTooltipItem[];
}

export function MapTooltip({ title, items = [] }: MapTooltipProps) {
  let previousGroup: string | undefined;

  return (
    <div className="map-tooltip">
      <p className="map-tooltip-title">{title}</p>
      {items.map((item, index) => {
        const isNewGroup = index > 0 && item.group !== previousGroup;
        previousGroup = item.group;
        return (
          <div key={`${item.label}-${index}`}>
            {isNewGroup && <div className="map-tooltip-divider" />}
            <div className="map-tooltip-row">
              <span className="map-tooltip-row-label">{item.label}</span>
              <span className="map-tooltip-row-value">{item.value}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
