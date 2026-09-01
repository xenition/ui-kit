import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney } from '../commerce';
import { colorVar } from '../charts/internal';
import type { PriceHistoryProps } from './PriceHistory';

/** Drop-in for {@link PriceHistoryProps} — same props, the V4 "listing" design. */
export type PriceHistoryV4Props = PriceHistoryProps;

const CHART_W = 240;

/**
 * PriceHistory — **V4** "listing" design (web parity of the native V4). The
 * editorial, price-forward take on a listing's price-over-time card: the
 * **latest price big**, the net change from the first point (tinted `success`
 * up / `danger` down / `muted` flat), and a token-colored line/area chart of the
 * series with a dot on every point (the event markers). Same props/behavior as
 * {@link PriceHistoryProps} — guards empty input with a muted note and never
 * indexes an empty array. All colors from `--xen-*` token vars/classes (no
 * literals); money uses the shared `formatMoney`.
 */
export const PriceHistoryV4 = React.forwardRef<HTMLDivElement, PriceHistoryV4Props>(
  function PriceHistoryV4(
    { points, currency = 'USD', title = 'Price history', chartHeight = 48, className, ...rest },
    ref
  ) {
    const shell = (children: React.ReactNode): React.ReactElement => (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-2 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)] text-on-surface shadow-md',
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
    const chartColor = colorVar(delta >= 0 ? 'success' : 'danger');

    const series = points.map((p) => p.cents);
    const hi = Math.max(...series);
    const lo = Math.min(...series);
    const range = hi - lo || 1;
    const pad = 3;
    const h = chartHeight;
    const pts = series.map((v, i) => {
      const x = series.length === 1 ? CHART_W / 2 : pad + (i / (series.length - 1)) * (CHART_W - pad * 2);
      const y = h - pad - ((v - lo) / range) * (h - pad * 2);
      return { x, y };
    });
    const line = pts.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');
    const area = `${pad},${h} ${line} ${(CHART_W - pad).toFixed(2)},${h}`;

    return shell(
      <>
        <span className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-on-surface">{formatMoney(last.cents, currency)}</span>
          <span className={cn('text-sm font-semibold', trendClass)}>{`${arrow} ${Math.abs(pct)}%`}</span>
        </span>
        <svg
          viewBox={`0 0 ${CHART_W} ${h}`}
          width="100%"
          height={h}
          preserveAspectRatio="none"
          role="img"
          aria-label={`Price history chart, ${points.length} points, ${
            delta >= 0 ? 'up' : 'down'
          } ${Math.abs(pct)} percent`}
          className="w-full"
        >
          {series.length > 1 ? (
            <polygon points={area} fill={chartColor} fillOpacity={0.12} stroke="none" />
          ) : null}
          {series.length === 1 ? (
            <circle cx={pts[0]!.x} cy={pts[0]!.y} r={3} fill={chartColor} />
          ) : (
            <polyline
              points={line}
              fill="none"
              stroke={chartColor}
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          )}
          {/* Event markers — a dot on every point. */}
          {pts.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={2.5} fill={chartColor} />
          ))}
        </svg>
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
