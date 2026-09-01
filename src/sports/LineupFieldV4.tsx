import * as React from 'react';
import { cn } from '../primitives/cn';
import { tappableProps, FOCUS_RING } from './interactive';
import type { LineupFieldProps, LineupPlayer } from './LineupField';

/** Drop-in for {@link LineupFieldProps} — same props, the V4 "broadcast" design. */
export type LineupFieldV4Props = LineupFieldProps;

const clamp01 = (n: number): number => (n < 0 ? 0 : n > 1 ? 1 : n);

/**
 * LineupField — **V4** "broadcast" design (web parity of the native V4). The
 * starting XI as a matchday graphic: the pitch is a soft, token-derived tinted
 * surface (a `success` wash — the grass token, never a literal green) carrying a
 * halfway line + center circle, and player tokens sit on it as bold **primary**
 * (home) / accent (away) dots with shirt number + name so a token is legible
 * without color. Formation caption and per-player tap are preserved. Same
 * props/behavior as {@link LineupFieldProps}; all colors from `--xen-*` token
 * classes (no literals).
 */
export const LineupFieldV4 = React.forwardRef<HTMLDivElement, LineupFieldV4Props>(
  function LineupFieldV4(
    {
      players = [],
      formation,
      height = 320,
      onSelectPlayer,
      emptyLabel = 'Lineup not announced',
      className,
      ...rest
    },
    ref
  ) {
    const token = (p: LineupPlayer): React.ReactElement => {
      const away = p.side === 'away';
      const a11y = `${p.name}${p.number !== undefined ? `, number ${p.number}` : ''}, ${
        p.side ?? 'home'
      }`;
      const interactive = tappableProps(
        onSelectPlayer ? () => onSelectPlayer(p) : undefined,
        a11y
      );
      return (
        <div
          key={p.id}
          className={cn(
            'absolute flex w-14 -translate-x-1/2 -translate-y-1/2 flex-col items-center',
            onSelectPlayer && FOCUS_RING
          )}
          style={{ left: `${clamp01(p.x) * 100}%`, top: `${clamp01(p.y) * 100}%` }}
          {...(onSelectPlayer ? {} : { 'aria-label': a11y })}
          {...interactive}
        >
          <span
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full border-2 border-surface text-xs font-extrabold shadow-sm',
              away ? 'bg-accent text-on-accent' : 'bg-primary text-on-primary'
            )}
          >
            {p.number ?? '·'}
          </span>
          <span className="mt-0.5 truncate rounded-full bg-surface/80 px-1 text-center text-xs font-bold text-on-surface">
            {p.name}
          </span>
        </div>
      );
    };

    return (
      <div ref={ref} className={cn('flex flex-col gap-2', className)} {...rest}>
        {formation ? (
          <span className="text-sm font-extrabold text-on-surface">Formation {formation}</span>
        ) : null}
        <div
          role="img"
          aria-label={`Lineup pitch${formation ? `, ${formation}` : ''}`}
          className="relative overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-success/10"
          style={{ height }}
        >
          {/* Halfway line + center circle — pure div decoration, token borders. */}
          <div aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-success/30" />
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-success/30"
          />
          {players.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <span className="text-sm text-muted">{emptyLabel}</span>
            </div>
          ) : (
            players.map(token)
          )}
        </div>
      </div>
    );
  }
);

export type { LineupPlayer };
