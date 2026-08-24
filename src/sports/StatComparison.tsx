import * as React from 'react';
import { cn } from '../primitives/cn';

/** One head-to-head stat row. */
export interface StatComparisonRow {
  /** Metric label (e.g. `Possession`). */
  label: string;
  /** Home value. */
  home: number;
  /** Away value. */
  away: number;
  /** Suffix appended to displayed values (e.g. `%`). */
  suffix?: string;
  /** `higher` wins (default) or `lower` wins (e.g. fouls) — drives emphasis. */
  better?: 'higher' | 'lower';
}

export interface StatComparisonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Home team name (left). */
  homeLabel: string;
  /** Away team name (right). */
  awayLabel: string;
  /** Comparison rows. */
  rows: StatComparisonRow[];
  /** Home crest glyph. */
  homeCrest?: string;
  /** Away crest glyph. */
  awayCrest?: string;
  /** Empty-state label. */
  emptyLabel?: string;
}

/**
 * A two-team stat comparison — mirrored horizontal bars sharing a center line,
 * one row per metric (possession, shots, …). Each bar is proportional to its
 * share of the pair total; the winning side is emphasised by weight (leading
 * side reads bolder) so ranking survives without relying on color. Home uses
 * the `primary` slot, away the `accent` slot. Empty state built in. Token-only
 * colors; bars are plain `div`s (no chart dependency).
 */
export const StatComparison = React.forwardRef<HTMLDivElement, StatComparisonProps>(
  function StatComparison(
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
      'flex flex-col gap-3 rounded-lg border border-border bg-surface p-4 text-on-surface',
      className
    );

    const header = (
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center gap-1">
          <span aria-hidden="true" className="text-base leading-none">
            {homeCrest ?? '🛡'}
          </span>
          <span className="truncate text-sm font-bold text-primary">{homeLabel}</span>
        </div>
        <div className="flex flex-1 items-center justify-end gap-1">
          <span className="truncate text-sm font-bold text-accent">{awayLabel}</span>
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

    return (
      <div ref={ref} className={shell} {...rest}>
        {header}
        {rows.map((row, i) => {
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
                    'text-sm text-on-surface',
                    homeWins ? 'font-bold' : 'font-medium'
                  )}
                >
                  {fmt(row.home, row.suffix)}
                </span>
                <span className="text-xs font-semibold text-muted">{row.label}</span>
                <span
                  className={cn(
                    'text-sm text-on-surface',
                    awayWins ? 'font-bold' : 'font-medium'
                  )}
                >
                  {fmt(row.away, row.suffix)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex h-2 flex-1 justify-end overflow-hidden rounded-full bg-neutral-100">
                  <div className="h-full bg-primary" style={{ width: `${homePct}%` }} />
                </div>
                <div className="flex h-2 flex-1 justify-start overflow-hidden rounded-full bg-neutral-100">
                  <div className="h-full bg-accent" style={{ width: `${awayPct}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);
