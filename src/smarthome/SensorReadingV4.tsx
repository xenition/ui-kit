import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { Badge, type BadgeTone } from '../primitives/Badge';
import type { SensorReadingProps, SensorStatus } from './SensorReading';

/** Drop-in for {@link SensorReadingProps} — same props, the V4 "ambient" design. */
export type SensorReadingV4Props = SensorReadingProps;

const STATUS_META: Record<
  SensorStatus,
  { accent: 'primary' | 'warn' | 'danger' | 'muted'; text: string; label: string; tone: BadgeTone }
> = {
  normal: { accent: 'primary', text: 'text-on-surface', label: 'Normal', tone: 'success' },
  warn: { accent: 'warn', text: 'text-warn', label: 'High', tone: 'warn' },
  danger: { accent: 'danger', text: 'text-danger', label: 'Alert', tone: 'danger' },
  offline: { accent: 'muted', text: 'text-muted', label: 'Offline', tone: 'muted' },
};

/** Icon-disc tint per accent — soft wash + ring, all from `--xen-*` token classes. */
const DISC: Record<'primary' | 'warn' | 'danger' | 'muted', string> = {
  primary: 'border-primary/40 bg-primary/[0.12]',
  warn: 'border-warn/40 bg-warn/[0.12]',
  danger: 'border-danger/40 bg-danger/[0.12]',
  muted: 'border-border bg-on-surface/5',
};

/**
 * SensorReading — **V4** "ambient" design (web parity of the native V4). The
 * calm take on a sensor card: a glyph sits in a **status-tinted glowing disc**,
 * the reading is a **big legible numeral** (`text-3xl`, weight 800) beside its
 * unit, with the sensor `label` and a soft-tint status pill
 * (Normal / High / Alert / Offline) below. `status` also colors the numeral —
 * but the pill's icon+label always carries the meaning, so an at-risk reading
 * is never conveyed by color alone. When `offline` the value renders as an em
 * dash; optional `trend` sits underneath. Same props/behavior as
 * {@link SensorReadingProps}; all colors from `--xen-*` token classes (no
 * literals).
 */
export const SensorReadingV4 = React.forwardRef<HTMLDivElement, SensorReadingV4Props>(
  function SensorReadingV4({ label, value, unit, icon = '📈', status = 'normal', trend, className, style, ...rest }, ref) {
    const meta = STATUS_META[status];
    const shownValue = status === 'offline' || value == null ? '—' : String(value);

    return (
      <div
        ref={ref}
        style={style}
        className={cn(
          'rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)] shadow-sm',
          className
        )}
        {...rest}
      >
        <div className="flex items-start gap-[var(--xen-space-sm)]">
          {/* Glowing status disc — the ambient signature. */}
          <span
            className={cn(
              'flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] border',
              DISC[meta.accent]
            )}
          >
            <Icon glyph={icon} color={meta.accent} size="lg" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-1">
              <span className={cn('font-heading text-3xl font-extrabold leading-none', meta.text)}>{shownValue}</span>
              {unit != null && shownValue !== '—' ? <span className="text-base text-muted">{unit}</span> : null}
            </div>
            <p className="mt-[var(--xen-space-xs)] truncate text-xs text-muted">{label}</p>
          </div>
        </div>
        <div className="mt-[var(--xen-space-md)] flex items-center justify-between gap-[var(--xen-space-xs)]">
          <Badge tone={meta.tone} variant="soft">
            {meta.label}
          </Badge>
          {trend != null ? <span className="truncate text-xs text-muted">{trend}</span> : null}
        </div>
      </div>
    );
  }
);
