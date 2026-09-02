import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives/Badge';
import { clampPct, TONE_BG, type LogisticsTone } from './internal';
import type { ETABarProps, ETAStatus } from './ETABar';

/** Drop-in for {@link ETABarProps} — same props, the V4 "dispatch" design. */
export type ETABarV4Props = ETABarProps;

const ETA_META: Record<ETAStatus, { glyph: string; label: string; tone: LogisticsTone }> = {
  'on-time': { glyph: '⏱', label: 'On time', tone: 'success' },
  ahead: { glyph: '⚡', label: 'Ahead', tone: 'primary' },
  delayed: { glyph: '⏳', label: 'Delayed', tone: 'warn' },
  arrived: { glyph: '✓', label: 'Arrived', tone: 'success' },
};

/**
 * ETABar — **V4** "dispatch" design (web parity of the native V4). The confident,
 * operations-desk take on a journey/ETA bar: an elevated rounded card with a soft
 * shadow, a labelled glyph + word punctuality badge (never color alone), a big
 * legible **tabular-nums** ETA, a token fill sized to `progress`, and an
 * origin→destination label row. Exposes a `progressbar` role with `aria-valuenow`
 * so completion is announced, not inferred from the fill color. Identical
 * props/behavior to {@link ETABarProps}. The fill and track come from theme
 * tokens — no literals.
 */
export const ETABarV4 = React.forwardRef<HTMLDivElement, ETABarV4Props>(function ETABarV4(
  { progress, status = 'on-time', eta, origin, destination, loading = false, className, ...rest },
  ref
) {
  const pct = clampPct(progress);
  const meta = ETA_META[status];
  const shell = 'rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm';

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuemin={loading ? undefined : 0}
      aria-valuemax={loading ? undefined : 100}
      aria-valuenow={loading ? undefined : pct}
      aria-busy={loading ? true : undefined}
      aria-label={loading ? 'ETA loading' : `${meta.label}${eta ? `, ETA ${eta}` : ''}, ${pct}% complete`}
      data-xen-eta-bar=""
      className={cn(shell, 'flex flex-col gap-[var(--xen-space-sm)] p-[var(--xen-space-md)]', className)}
      {...rest}
    >
      <div className="flex items-center justify-between gap-[var(--xen-space-sm)]">
        <Badge tone={meta.tone} variant="soft" size="sm">
          <span aria-hidden="true">{meta.glyph}</span> {meta.label}
        </Badge>
        {eta ? <span className="text-base font-bold tabular-nums text-on-surface">{eta}</span> : null}
      </div>

      <div className="h-2.5 overflow-hidden rounded-full bg-neutral-100">
        {!loading ? (
          <div className={cn('h-full rounded-full', TONE_BG[meta.tone])} style={{ width: `${pct}%` }} />
        ) : (
          <div className="h-full w-[40%] animate-pulse rounded-full bg-neutral-200" />
        )}
      </div>

      {origin || destination ? (
        <div className="flex justify-between gap-[var(--xen-space-sm)]">
          <span className="min-w-0 flex-1 truncate text-xs text-muted">{origin ?? ''}</span>
          <span className="min-w-0 flex-1 truncate text-right text-xs text-muted">{destination ?? ''}</span>
        </div>
      ) : null}
    </div>
  );
});
