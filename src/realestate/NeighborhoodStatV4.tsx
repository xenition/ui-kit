import * as React from 'react';
import { cn } from '../primitives/cn';
import type { StatisticTrend } from '../primitives';
import type { NeighborhoodStatProps } from './NeighborhoodStat';

/** Drop-in for {@link NeighborhoodStatProps} — same props, the V4 "listing" design. */
export type NeighborhoodStatV4Props = NeighborhoodStatProps;

function inferTrend(delta: string | number | undefined): StatisticTrend {
  if (typeof delta === 'number') {
    if (delta > 0) return 'up';
    if (delta < 0) return 'down';
  }
  return 'flat';
}

const TREND_CLASS: Record<StatisticTrend, string> = {
  up: 'text-success',
  down: 'text-danger',
  flat: 'text-muted',
};
const TREND_ARROW: Record<StatisticTrend, string> = {
  up: '▲',
  down: '▼',
  flat: '→',
};

/**
 * NeighborhoodStat — **V4** "listing" design (web parity of the native V4). The
 * editorial take on a single neighborhood metric: an optional glyph in a
 * soft-primary disc, a **big value numeral** with its label, and an
 * above/below-average trend indicator (arrow + delta, tinted `success` up /
 * `danger` down / `muted` flat). Same props/behavior as
 * {@link NeighborhoodStatProps} — the value/label/suffix/caption and the delta
 * tone/arrow logic are preserved. All colors from `--xen-*` token classes (no
 * literals).
 */
export const NeighborhoodStatV4 = React.forwardRef<HTMLDivElement, NeighborhoodStatV4Props>(
  function NeighborhoodStatV4(
    { label, value, delta, trend, suffix, glyph, caption, className, ...rest },
    ref
  ) {
    const resolvedTrend = trend ?? inferTrend(delta);

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-start gap-3 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)] text-on-surface shadow-md',
          className
        )}
        {...rest}
      >
        {glyph ? (
          <span
            aria-hidden="true"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-2xl text-primary"
          >
            {glyph}
          </span>
        ) : null}
        <div className="flex-1">
          <span className="text-sm text-muted">{label}</span>
          <span className="flex items-end gap-1">
            <span className="text-4xl font-bold leading-none text-on-surface">{value}</span>
            {suffix != null ? <span className="pb-0.5 text-base text-muted">{suffix}</span> : null}
          </span>
          {delta != null ? (
            <span
              className={cn('mt-1 flex items-center gap-1 text-sm font-semibold', TREND_CLASS[resolvedTrend])}
            >
              <span aria-hidden="true" className="text-xs">
                {TREND_ARROW[resolvedTrend]}
              </span>
              {String(delta)}
            </span>
          ) : null}
          {caption ? <p className="mt-1 text-xs text-muted">{caption}</p> : null}
        </div>
      </div>
    );
  }
);
