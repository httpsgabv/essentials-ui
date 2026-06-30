export interface CaptionProps {
  title: string;
  subtitle?: string;
}

export function Caption({ title, subtitle }: CaptionProps) {
  return (
    <div className="slot-panel">
      <p className="slot-caption-title">{title}</p>
      {subtitle && <p className="slot-caption-subtitle">{subtitle}</p>}
    </div>
  );
}
