import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';
import { tappableProps } from './interactive';

/** One competitor slot in a bracket match. */
export interface BracketSlot {
  /** Competitor name; `undefined`/empty renders a "TBD" placeholder. */
  name?: string;
  /** Score / result (optional). */
  score?: number;
  /** Marks the advancing side. */
  winner?: boolean;
}

/** A single knockout tie. */
export interface BracketMatch {
  /** Stable key. */
  id: string;
  /** Top slot. */
  top: BracketSlot;
  /** Bottom slot. */
  bottom: BracketSlot;
}

/** A bracket round (e.g. Quarter-finals). */
export interface BracketRound {
  /** Round title. */
  title: string;
  /** Matches in the round. */
  matches: BracketMatch[];
}

export interface BracketViewProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Rounds left→right (earliest first). */
  rounds: BracketRound[];
  /** Fires with the tapped match (web parity of native `onSelectMatch`). */
  onSelectMatch?: (match: BracketMatch, roundIndex: number) => void;
  /** Empty-state label. */
  emptyLabel?: string;
}

/**
 * A knockout tournament bracket — a STATIC, dependency-free layout built from
 * horizontally-scrolling round columns of `div`-based match tiles. No SVG /
 * canvas dep; connectors are implied by column layout. Each tie shows both
 * competitors (TBD placeholder when unknown) and marks the winner by weight + a
 * check glyph, not color alone. Activated via `onSelectMatch`. Token-only
 * colors.
 */
export const BracketView = React.forwardRef<HTMLDivElement, BracketViewProps>(
  function BracketView(
    { rounds, onSelectMatch, emptyLabel = 'Bracket not drawn yet', className, ...rest },
    ref
  ) {
    if (rounds.length === 0) {
      return (
        <div ref={ref} className={className} {...rest}>
          <EmptyState title={emptyLabel} description="Rounds appear once the draw is made." />
        </div>
      );
    }

    const renderSlot = (slot: BracketSlot): React.ReactElement => {
      const named = Boolean(slot.name && slot.name.length > 0);
      return (
        <div className="flex items-center justify-between gap-1">
          <div className="flex flex-1 items-center gap-1">
            {slot.winner ? (
              <span aria-hidden="true" className="text-xs text-success">
                ✓
              </span>
            ) : (
              <span aria-hidden="true" className="text-xs text-muted">
                ·
              </span>
            )}
            <span
              className={cn(
                'flex-1 truncate text-sm',
                named ? 'text-on-surface' : 'italic text-muted',
                slot.winner ? 'font-bold' : 'font-medium'
              )}
            >
              {named ? slot.name : 'TBD'}
            </span>
          </div>
          {slot.score !== undefined ? (
            <span className="text-sm font-bold text-on-surface">{slot.score}</span>
          ) : null}
        </div>
      );
    };

    return (
      <div
        ref={ref}
        className={cn('flex gap-6 overflow-x-auto p-1', className)}
        {...rest}
      >
        {rounds.map((round, ri) => (
          <div
            key={`${round.title}-${ri}`}
            className="flex w-44 flex-col justify-around gap-4"
          >
            <span className="text-center text-xs font-bold text-muted">{round.title}</span>
            {round.matches.map((m) => {
              const a11y = `${m.top.name ?? 'TBD'} versus ${m.bottom.name ?? 'TBD'}`;
              const interactive = tappableProps(
                onSelectMatch ? () => onSelectMatch(m, ri) : undefined,
                a11y
              );
              return (
                <div
                  key={m.id}
                  className={cn(
                    'flex flex-col gap-1 rounded-md border border-border bg-surface p-2',
                    onSelectMatch &&
                      'cursor-pointer outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary-300'
                  )}
                  {...(onSelectMatch ? {} : { 'aria-label': a11y })}
                  {...interactive}
                >
                  {renderSlot(m.top)}
                  <div aria-hidden="true" className="h-px bg-border" />
                  {renderSlot(m.bottom)}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }
);
