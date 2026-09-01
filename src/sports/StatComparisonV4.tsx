import * as React from 'react';
import { cn } from '../primitives/cn';
import type { StatComparisonProps, StatComparisonRow } from './StatComparison';

/** Drop-in for {@link StatComparisonProps} — same props, the V4 "broadcast" design. */
export type StatComparisonV4Props = StatComparisonProps;

/**
 * StatComparison — **V4** "broadcast" design (web parity of the native V4). The
 * matchday take on a head-to-head: an elevated card of center-split bars, one
 * row per metric, home filling left in the `primary` accent and away filling
 * right in the `accent` token. Big value numerals flank each row and the leading
 * side reads bolder in `primary`, so ranking survives without relying on color.
 * Same props/behavior as {@link StatComparisonProps}; all colors from `--xen-*`
 * token classes (no literals). Empty state built in. 8-pt spacing, one accent.
 */
export const StatComparisonV4 = React.forwardRef<HTMLDivElement, StatComparisonV4Props>(
  function StatComparisonV4(
    {
      homeLabel,
      awayLabel,
      rows,
      homeCrest,
      awayCrest,
      emptyLabel = 'No stats to compare',
      className,
      ...rest
    },
    ref
  ) {
    const shell = cn(
      'flex flex-col gap-4 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-4 text-on-surface shadow-sm',
      className
    );

    const header = (
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center gap-2">
          <span aria-hidden="true" className="text-base leading-none">
            {homeCrest ?? '🛡'}
          </span>
          <span className="truncate text-sm font-extrabold text-primary">{homeLabel}</span>
        </div>
        <div className="flex flex-1 items-center justify-end gap-2">
          <span className="truncate text-sm font-extrabold text-accent">{awayLabel}</span>
          <span aria-hidden="true" className="text-base leading-none">
            {awayCrest ?? '🛡'}
          </span>
        </div>
      </div>
    );

    if (rows.length === 0) {
      return (
        <div ref={ref} className={shell} {...rest}>
          {header}
          <p className="py-3 text-center text-sm text-muted">{emptyLabel}</p>
        </div>
      );
    }

    const fmt = (v: number, suffix?: string) => `${v}${suffix ?? ''}`;

    const renderRow = (row: StatComparisonRow, i: number): React.ReactElement => {
      const total = row.home + row.away;
      const homePct = total > 0 ? Math.round((row.home / total) * 100) : 50;
      const awayPct = total > 0 ? Math.round((row.away / total) * 100) : 50;
      const better = row.better ?? 'higher';
      const homeWins = better === 'higher' ? row.home > row.away : row.home < row.away;
      const awayWins = better === 'higher' ? row.away > row.home : row.away < row.home;
      return (
        <div
          key={`${row.label}-${i}`}
          aria-label={`${row.label}: ${homeLabel} ${fmt(row.home, row.suffix)}, ${awayLabel} ${fmt(
            row.away,
            row.suffix
          )}`}
          className="flex flex-col gap-1"
        >
          <div className="flex items-center justify-between">
            <span
              className={cn(
                'text-xl tabular-nums',
                homeWins ? 'font-extrabold text-primary' : 'font-medium text-muted'
              )}
            >
              {fmt(row.home, row.suffix)}
            </span>
            <span className="text-xs font-bold uppercase tracking-wide text-muted">{row.label}</span>
            <span
              className={cn(
                'text-xl tabular-nums',
                awayWins ? 'font-extrabold text-accent' : 'font-medium text-muted'
              )}
            >
              {fmt(row.away, row.suffix)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex h-2 flex-1 justify-end overflow-hidden rounded-full bg-primary/10">
              <div
                className={cn('h-full rounded-full bg-primary', homeWins ? 'opacity-100' : 'opacity-40')}
                style={{ width: `${homePct}%` }}
              />
            </div>
            <div className="flex h-2 flex-1 justify-start overflow-hidden rounded-full bg-accent/10">
              <div
                className={cn('h-full rounded-full bg-accent', awayWins ? 'opacity-100' : 'opacity-40')}
                style={{ width: `${awayPct}%` }}
              />
            </div>
          </div>
        </div>
      );
    };

    return (
      <div ref={ref} className={shell} {...rest}>
        {header}
        {rows.map(renderRow)}
      </div>
    );
  }
);
