import * as React from 'react';
import { cn } from '../primitives/cn';
import { tappableProps } from './interactive';

/** A player token placed on the pitch by fractional coordinates. */
export interface LineupPlayer {
  /** Stable key / player id. */
  id: string;
  /** Short name / surname shown under the token. */
  name: string;
  /** Shirt number shown inside the token. */
  number?: number;
  /** Left position, 0–1 of pitch width. */
  x: number;
  /** Top position, 0–1 of pitch height. */
  y: number;
  /** Side — tints the token from the primary (home) / accent (away) slot. */
  side?: 'home' | 'away';
}

export interface LineupFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Player tokens to place. Empty renders a labelled placeholder pitch. */
  players?: LineupPlayer[];
  /** Formation caption (e.g. `4-3-3`). */
  formation?: string;
  /** Pitch height in px. Default 320. */
  height?: number;
  /** Fires with the tapped player (web parity of native `onSelectPlayer`). */
  onSelectPlayer?: (player: LineupPlayer) => void;
  /** Empty-state label. */
  emptyLabel?: string;
}

const clamp01 = (n: number): number => (n < 0 ? 0 : n > 1 ? 1 : n);

/**
 * A starting-XI pitch — a STATIC, dependency-free placeholder built entirely
 * from styled `div`s: a token-bordered field with a halfway line + center
 * circle, and player tokens positioned by fractional (x, y) coordinates. No
 * image / SVG dependency; it renders anywhere. Home/away tint from the
 * primary/accent slots, reinforced by the shirt number + name label so a token
 * is identifiable without color. Empty `players` shows a labelled empty pitch.
 * Token-only colors.
 */
export const LineupField = React.forwardRef<HTMLDivElement, LineupFieldProps>(
  function LineupField(
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
            onSelectPlayer &&
              'cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
          )}
          style={{ left: `${clamp01(p.x) * 100}%`, top: `${clamp01(p.y) * 100}%` }}
          {...(onSelectPlayer ? {} : { 'aria-label': a11y })}
          {...interactive}
        >
          <span
            className={cn(
              'flex h-[30px] w-[30px] items-center justify-center rounded-full border border-surface text-xs font-bold',
              away ? 'bg-accent text-on-accent' : 'bg-primary text-on-primary'
            )}
          >
            {p.number ?? '·'}
          </span>
          <span className="mt-0.5 truncate text-center text-xs font-semibold text-on-surface">
            {p.name}
          </span>
        </div>
      );
    };

    return (
      <div ref={ref} className={cn('flex flex-col gap-2', className)} {...rest}>
        {formation ? (
          <span className="text-sm font-bold text-on-surface">Formation {formation}</span>
        ) : null}
        <div
          role="img"
          aria-label={`Lineup pitch${formation ? `, ${formation}` : ''}`}
          className="relative overflow-hidden rounded-lg border border-border bg-neutral-50"
          style={{ height }}
        >
          {/* Halfway line + center circle — pure div decoration. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-1/2 h-px bg-border"
          />
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border"
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
