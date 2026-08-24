import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { Badge, type BadgeTone } from '../primitives/Badge';

/** Health of a sensor value. */
export type SensorStatus = 'normal' | 'warn' | 'danger' | 'offline';

export interface SensorReadingProps {
  /** What is being measured (e.g. "Temperature", "CO₂"). */
  label: string;
  /** Numeric/formatted reading. Shown as "—" when `offline`. */
  value?: string | number;
  /** Unit suffix (e.g. "°C", "ppm", "%"). */
  unit?: string;
  /** Leading glyph/emoji (e.g. "🌡️", "💧"). */
  icon?: string;
  /** Reading health — drives the value color + a text status chip. */
  status?: SensorStatus;
  /** Optional trend hint shown under the value (e.g. "↑ 2° since 1pm"). */
  trend?: string;
  className?: string;
  style?: React.CSSProperties;
}

const STATUS_META: Record<SensorStatus, { text: string; label: string; tone: BadgeTone }> = {
  normal: { text: 'text-on-surface', label: 'Normal', tone: 'success' },
  warn: { text: 'text-warn', label: 'Elevated', tone: 'warn' },
  danger: { text: 'text-danger', label: 'Alert', tone: 'danger' },
  offline: { text: 'text-muted', label: 'Offline', tone: 'muted' },
};

/**
 * A single sensor reading — glyph, label, a large value+unit, and a status
 * {@link Badge}. `status` colors the value (`warn`→warn, `danger`→danger,
 * else onSurface/muted) but is always paired with a text chip so an at-risk
 * reading is legible without color. When `offline` the value renders as an em
 * dash. Optional `trend` line sits underneath. Token-bound throughout.
 */
export const SensorReading = React.forwardRef<HTMLDivElement, SensorReadingProps>(
  function SensorReading({ label, value, unit, icon = '📈', status = 'normal', trend, className, style }, ref) {
    const meta = STATUS_META[status];
    const shownValue = status === 'offline' || value == null ? '—' : String(value);

    return (
      <Card ref={ref} style={style} className={className}>
        <div className="flex items-center gap-[var(--xen-space-xs)]">
          <Icon glyph={icon} color="muted" size="base" />
          <span className="flex-1 text-xs text-muted">{label}</span>
          <Badge tone={meta.tone}>{meta.label}</Badge>
        </div>
        <div className="mt-[var(--xen-space-sm)] flex items-baseline gap-1">
          <span className={cn('font-heading text-2xl font-bold', meta.text)}>{shownValue}</span>
          {unit != null && shownValue !== '—' ? <span className="text-sm text-muted">{unit}</span> : null}
        </div>
        {trend != null ? <p className="mt-0.5 text-xs text-muted">{trend}</p> : null}
      </Card>
    );
  }
);
