import * as React from 'react';
import { cn } from '../primitives/cn';
import { tappableProps, FOCUS_RING } from './interactive';
import type { ScoreTickerProps, TickerMatch, TickerStatus } from './ScoreTicker';

/** Drop-in for {@link ScoreTickerProps} — same props, the V4 "broadcast" design. */
export type ScoreTickerV4Props = ScoreTickerProps;

const STATUS_META: Record<
  TickerStatus,
  { label: string; glyph: string; live: boolean; pill: string }
> = {
  live: { label: 'LIVE', glyph: '●', live: true, pill: 'bg-danger/10 text-danger' },
  final: { label: 'FT', glyph: '✓', live: false, pill: 'bg-muted/10 text-muted' },
  upcoming: { label: 'SOON', glyph: '🕑', live: false, pill: 'bg-primary/10 text-primary' },
};

/**
 * ScoreTicker — **V4** "broadcast" design (web parity of the native V4). A
 * horizontally-scrolling strip of mini score cards, each a compact matchup with
 * a soft-tint status pill (a pulsing `danger` dot reinforces "LIVE" — never
 * color alone) and bold numerals; live tiles are subtly emphasised with a
 * `primary` ring. One accent: `primary`. Same props/behavior as
 * {@link ScoreTickerProps} (drop-in) — keeps the horizontal scroll, per-match
 * `onSelect`, loading and empty states. All colors from `--xen-*` token classes
 * (no literals).
 */
export const ScoreTickerV4 = React.forwardRef<HTMLDivElement, ScoreTickerV4Props>(
  function ScoreTickerV4(
    { matches, onSelect, loadingTiles, emptyLabel = 'No matches', className, ...rest },
    ref
  ) {
    const strip = 'flex gap-2 overflow-x-auto px-1 py-1';

    if (loadingTiles && loadingTiles > 0) {
      return (
        <div ref={ref} aria-busy="true" className={cn(strip, className)} {...rest}>
          {Array.from({ length: loadingTiles }).map((_, i) => (
            <div
              key={i}
              className="h-20 w-36 shrink-0 rounded-[var(--xen-radius-lg)] bg-on-surface/10"
            />
          ))}
        </div>
      );
    }

    if (matches.length === 0) {
      return (
        <div
          ref={ref}
          className={cn(
            'rounded-[var(--xen-radius-lg)] border border-border bg-surface px-4 py-3 text-center text-sm text-muted',
            className
          )}
          {...rest}
        >
          {emptyLabel}
        </div>
      );
    }

    const line = (name: string, score: number | undefined) => (
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-sm font-semibold text-on-surface">{name}</span>
        <span
          className={cn(
            'text-lg font-extrabold',
            score === undefined ? 'text-muted' : 'text-on-surface'
          )}
        >
          {score === undefined ? '–' : score}
        </span>
      </div>
    );

    return (
      <div ref={ref} className={cn(strip, className)} {...rest}>
        {matches.map((m: TickerMatch) => {
          const status = m.status ?? 'upcoming';
          const sm = STATUS_META[status] ?? STATUS_META.upcoming;
          const hasScore = m.homeScore !== undefined && m.awayScore !== undefined;
          const a11y = `${m.home} versus ${m.away}, ${sm.label}${
            hasScore ? `, ${m.homeScore} ${m.awayScore}` : ''
          }`;
          const interactive = tappableProps(onSelect ? () => onSelect(m) : undefined, a11y);
          return (
            <div
              key={m.id}
              className={cn(
                'flex w-36 shrink-0 flex-col gap-1 rounded-[var(--xen-radius-lg)] border bg-surface p-3 shadow-sm',
                sm.live ? 'border-primary/40 ring-1 ring-primary/20' : 'border-border',
                onSelect && FOCUS_RING
              )}
              {...(onSelect ? {} : { 'aria-label': a11y })}
              {...interactive}
            >
              <div className="flex items-center gap-1">
                <span
                  className={cn(
                    'inline-flex flex-1 items-center gap-1 rounded-full px-2 py-0.5 text-[0.625rem] font-extrabold',
                    sm.pill
                  )}
                >
                  {sm.live ? (
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-danger" />
                  ) : (
                    <span aria-hidden="true">{sm.glyph}</span>
                  )}
                  {sm.label}
                </span>
                {m.clock ? <span className="text-xs font-semibold text-muted">{m.clock}</span> : null}
              </div>
              {line(m.home, m.homeScore)}
              {line(m.away, m.awayScore)}
            </div>
          );
        })}
      </div>
    );
  }
);
