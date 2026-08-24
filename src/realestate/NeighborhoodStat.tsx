import * as React from 'react';
import { cn } from '../primitives/cn';
import { Statistic, Icon, type StatisticTrend } from '../primitives';

export interface NeighborhoodStatProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Metric caption (e.g. "Walk Score", "Median rent"). */
  label: string;
  /** Headline value (already formatted, e.g. "92", "$3,200"). */
  value: React.ReactNode;
  /** Optional change indicator shown beside the value. */
  delta?: string | number;
  /** Tone/arrow for `delta`; inferred from a numeric delta when omitted. */
  trend?: StatisticTrend;
  /** Optional unit/suffix (e.g. "/100", "%"). */
  suffix?: React.ReactNode;
  /** Optional leading glyph/emoji. */
  glyph?: string;
  /** Optional one-line context under the value. */
  caption?: string;
}

/**
 * Web parity of the native `NeighborhoodStat`: a single neighborhood metric tile
 * — a labelled value with an optional trend delta, wrapped in a token-styled card
 * with an optional leading glyph and a caption. Composes the shared `Statistic`
 * (which owns the delta tone/arrow logic) and `Icon`. Presentational only; all
 * colors come from the `--xen-*` tokens — no literal colors.
 */
export const NeighborhoodStat = React.forwardRef<HTMLDivElement, NeighborhoodStatProps>(
  function NeighborhoodStat(
    { label, value, delta, trend, suffix, glyph, caption, className, ...rest },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-start gap-3 border border-border bg-surface p-[var(--xen-space-lg)]',
          'rounded-[var(--xen-radius-lg)]',
          className
        )}
        {...rest}
      >
        {glyph ? <Icon glyph={glyph} size="xl" color="primary" /> : null}
        <div className="flex-1">
          <Statistic label={label} value={value} delta={delta} trend={trend} suffix={suffix} />
          {caption ? <p className="mt-1 text-xs text-muted">{caption}</p> : null}
        </div>
      </div>
    );
  }
);
