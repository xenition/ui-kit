import * as React from 'react';
import { cn } from '../primitives/cn';
import { Progress, type ProgressTone } from '../primitives';

/** Health state of a monitored vehicle system. */
export type HealthStatus = 'ok' | 'attention' | 'critical' | 'unknown';
/** Presentation for a {@link VehicleHealthRow}. */
export type VehicleHealthVariant = 'default' | 'compact';

/** Status → tone classes + spelled-out word + glyph (never color alone). */
const HEALTH: Record<
  HealthStatus,
  { textClass: string; meterTone: ProgressTone; word: string; glyph: string }
> = {
  ok: { textClass: 'text-success', meterTone: 'success', word: 'OK', glyph: '✓' },
  attention: { textClass: 'text-warn', meterTone: 'warn', word: 'Attention', glyph: '!' },
  critical: { textClass: 'text-danger', meterTone: 'danger', word: 'Critical', glyph: '✕' },
  unknown: { textClass: 'text-muted', meterTone: 'primary', word: 'Unknown', glyph: '?' },
};

export interface VehicleHealthRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** System name, e.g. `'Tire pressure'`. */
  system: string;
  /** Health status. */
  status?: HealthStatus;
  /** Current reading, pre-formatted (e.g. `'32 psi'` / `'Good'`). */
  reading?: string;
  /** Icon glyph/emoji shown before the system name. */
  glyph?: string;
  /**
   * Optional 0–100 percentage that draws a mini meter (e.g. brake pad life).
   * Omit for a status-only row.
   */
  percent?: number;
  /** Presentation variant. */
  variant?: VehicleHealthVariant;
}

/**
 * One vehicle-health system row — its name, a reading, and a status conveyed by
 * a glyph plus a spelled-out word and an a11y label, so meaning never rests on
 * color; a `critical` status maps to the `danger` tone per contract. An optional
 * `percent` draws a token-tinted mini {@link Progress} meter (brake life, oil,
 * etc.). Presentational: shaped data only. Colors come from `--xen-*` token
 * classes — no literal colors. `percent` is clamped to 0–100. Web parity of the
 * native `VehicleHealthRow`.
 */
export const VehicleHealthRow = React.forwardRef<HTMLDivElement, VehicleHealthRowProps>(
  function VehicleHealthRow(
    { system, status = 'ok', reading, glyph, percent, variant = 'default', className, ...rest },
    ref
  ) {
    const h = HEALTH[status] ?? HEALTH.unknown;
    const compact = variant === 'compact';
    const hasMeter = typeof percent === 'number';
    const clamped = hasMeter ? Math.max(0, Math.min(100, Math.round(percent as number))) : 0;

    const a11y = `${system}: ${h.word}${reading ? `, ${reading}` : ''}${hasMeter ? `, ${clamped} percent` : ''}`;

    return (
      <div
        ref={ref}
        data-xen-vehicle-health=""
        aria-label={a11y}
        className={cn(
          'flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-border bg-surface px-[var(--xen-space-md)]',
          compact ? 'py-[var(--xen-space-sm)]' : 'py-[var(--xen-space-md)]',
          className
        )}
        {...rest}
      >
        <span
          aria-hidden="true"
          className={cn(
            'inline-flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-neutral-100 text-sm font-extrabold',
            h.textClass
          )}
        >
          {glyph ?? h.glyph}
        </span>

        <div className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-on-surface">{system}</span>
          {hasMeter ? (
            <div className="mt-1">
              <Progress value={clamped} max={100} tone={h.meterTone} size="sm" aria-hidden="true" />
            </div>
          ) : null}
        </div>

        <div className="flex flex-col items-end">
          {reading ? <span className="text-sm font-bold text-on-surface">{reading}</span> : null}
          <span className={cn('text-xs font-semibold', h.textClass)}>{h.word}</span>
        </div>
      </div>
    );
  }
);
