import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney } from '../commerce';
import { Sparkline } from '../charts';

/** One point in a listing's price timeline. */
export interface PricePoint {
  /** Short axis label (e.g. "Jan", "2023"). */
  label?: string;
  /** Price in integer minor units (cents). */
  cents: number;
}

export interface PriceHistoryProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Chronological price points. Empty renders a muted note. */
  points: PricePoint[];
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Card heading. */
  title?: string;
  /** Sparkline height in px (default 48). */
  chartHeight?: number;
}

/**
 * Web parity of the native `PriceHistory`: a listing's price-over-time card —
 * the latest price, the net change from the first point (tinted `success` up /
 * `danger` down / `muted` flat), and a token-bound {@link Sparkline} of the
 * trend. Presentational: cents in, nothing fetches. Guards empty input with a
 * muted note and never indexes an empty array. All colors come from the `--xen-*`
 * tokens — no literal colors.
 */
export const PriceHistory = React.forwardRef<HTMLDivElement, PriceHistoryProps>(
  function PriceHistory(
    { points, currency = 'USD', title = 'Price history', chartHeight = 48, className, ...rest },
    ref
  ) {
    const shell = (children: React.ReactNode): React.ReactElement => (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-2 border border-border bg-surface p-[var(--xen-space-lg)]',
          'rounded-[var(--xen-radius-lg)]',
          className
        )}
        {...rest}
      >
        <span className="text-base font-semibold text-on-surface">{title}</span>
        {children}
      </div>
    );

    if (points.length === 0) {
      return shell(<span className="text-sm text-muted">No price history</span>);
    }

    const first = points[0]!;
    const last = points[points.length - 1]!;
    const delta = last.cents - first.cents;
    const trendClass = delta > 0 ? 'text-success' : delta < 0 ? 'text-danger' : 'text-muted';
    const arrow = delta > 0 ? '▲' : delta < 0 ? '▼' : '→';
    const pct = first.cents !== 0 ? Math.round((delta / first.cents) * 100) : 0;
    const sparkColor = delta >= 0 ? 'success' : 'danger';

    return shell(
      <>
        <span className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-on-surface">{formatMoney(last.cents, currency)}</span>
          <span className={cn('text-sm font-semibold', trendClass)}>{`${arrow} ${Math.abs(pct)}%`}</span>
        </span>
        <Sparkline
          data={points.map((p) => p.cents)}
          height={chartHeight}
          width={220}
          color={sparkColor}
          className="w-full"
          aria-label={`Price history sparkline, ${points.length} points, ${
            delta >= 0 ? 'up' : 'down'
          } ${Math.abs(pct)} percent`}
        />
        {last.label || first.label ? (
          <span className="flex justify-between">
            <span className="text-xs text-muted">{first.label ?? ''}</span>
            <span className="text-xs text-muted">{last.label ?? ''}</span>
          </span>
        ) : null}
      </>
    );
  }
);
