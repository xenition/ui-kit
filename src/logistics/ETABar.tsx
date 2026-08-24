import * as React from 'react';
import { cn } from '../primitives/cn';
import { clampPct, TONE_TEXT, TONE_BG, type LogisticsTone } from './internal';

export type ETAStatus = 'on-time' | 'ahead' | 'delayed' | 'arrived';

const ETA_META: Record<ETAStatus, { glyph: string; label: string; tone: LogisticsTone }> = {
  'on-time': { glyph: '⏱', label: 'On time', tone: 'success' },
  ahead: { glyph: '⚡', label: 'Ahead', tone: 'primary' },
  delayed: { glyph: '⏳', label: 'Delayed', tone: 'warn' },
  arrived: { glyph: '✓', label: 'Arrived', tone: 'success' },
};

export interface ETABarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Journey completion, 0–100 (clamped, NaN-safe). */
  progress?: number;
  /** ETA punctuality — carried by glyph + word, never color alone. */
  status?: ETAStatus;
  /** Human ETA text (e.g. `12:40 PM`, `~25 min`). */
  eta?: string;
  /** Origin label, shown at the left end. */
  origin?: string;
  /** Destination label, shown at the right end. */
  destination?: string;
  /** Render a muted, indeterminate placeholder while the ETA is unknown. */
  loading?: boolean;
}

/**
 * A horizontal journey/ETA progress bar for a shipment or vehicle: a token fill
 * sized to `progress`, with an origin→destination label row and a glyph + word
 * punctuality status. Exposes a `progressbar` role with `aria-valuenow` so the
 * completion is announced, not inferred from the fill color. No literal colors —
 * the fill and track come from theme tokens. Web parity of the native `ETABar`.
 */
export const ETABar = React.forwardRef<HTMLDivElement, ETABarProps>(function ETABar(
  { progress, status = 'on-time', eta, origin, destination, loading = false, className, ...rest },
  ref
) {
  const pct = clampPct(progress);
  const meta = ETA_META[status];

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuemin={loading ? undefined : 0}
      aria-valuemax={loading ? undefined : 100}
      aria-valuenow={loading ? undefined : pct}
      aria-busy={loading ? true : undefined}
      aria-label={loading ? 'ETA loading' : `${meta.label}${eta ? `, ETA ${eta}` : ''}, ${pct}% complete`}
      className={cn('flex flex-col gap-[var(--xen-space-xs)]', className)}
      {...rest}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[var(--xen-space-xs)]">
          <span aria-hidden="true" className={cn('text-sm', TONE_TEXT[meta.tone])}>
            {meta.glyph}
          </span>
          <span className={cn('text-xs font-bold', TONE_TEXT[meta.tone])}>{meta.label}</span>
        </div>
        {eta ? <span className="text-xs font-semibold text-on-surface">{eta}</span> : null}
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
        {!loading ? (
          <div className={cn('h-full rounded-full', TONE_BG[meta.tone])} style={{ width: `${pct}%` }} />
        ) : (
          <div className="h-full w-[40%] animate-pulse rounded-full bg-neutral-200" />
        )}
      </div>

      {origin || destination ? (
        <div className="flex justify-between">
          <span className="min-w-0 flex-1 truncate text-xs text-muted">{origin ?? ''}</span>
          <span className="min-w-0 flex-1 truncate text-right text-xs text-muted">{destination ?? ''}</span>
        </div>
      ) : null}
    </div>
  );
});
