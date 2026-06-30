export interface StatusLegendProps {
  title?: string;
  reachedLabel?: string;
  progressLabel?: string;
  belowLabel?: string;
  sizeLabel?: string;
}

export function StatusLegend({
  title = 'Status da meta',
  reachedLabel = 'Atingida (≥100%)',
  progressLabel = 'Em progresso (60–99%)',
  belowLabel = 'Abaixo (<60%)',
  sizeLabel = 'Tamanho = meta (Kg)',
}: StatusLegendProps) {
  return (
    <div className="slot-status-legend">
      <div className="slot-status-legend-title">{title}</div>
      <div className="slot-status-row">
        <span className="slot-status-dot slot-status-dot--ok" />
        <span>{reachedLabel}</span>
      </div>
      <div className="slot-status-row">
        <span className="slot-status-dot slot-status-dot--warn" />
        <span>{progressLabel}</span>
      </div>
      <div className="slot-status-row">
        <span className="slot-status-dot slot-status-dot--bad" />
        <span>{belowLabel}</span>
      </div>
      <div className="slot-status-divider" />
      <div className="slot-size-row">
        <span className="slot-size-bubbles">
          <span className="slot-size-bubble" style={{ width: 6, height: 6 }} />
          <span className="slot-size-bubble" style={{ width: 10, height: 10 }} />
          <span className="slot-size-bubble" style={{ width: 14, height: 14 }} />
        </span>
        <span>{sizeLabel}</span>
      </div>
    </div>
  );
}
