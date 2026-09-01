import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';
import { tappableProps, FOCUS_RING } from './interactive';
import type {
  BracketViewProps,
  BracketSlot,
  BracketMatch,
  BracketRound,
} from './BracketView';

/** Drop-in for {@link BracketViewProps} — same props, the V4 "broadcast" design. */
export type BracketViewV4Props = BracketViewProps;

/**
 * BracketView — **V4** "broadcast" design (web parity of the native V4). The
 * knockout draw as a matchday graphic: horizontally-scrolling round columns of
 * clean, elevated matchup cells, the advancing side bolded and washed in a
 * soft-primary tint with a primary check glyph (never color alone). The implied
 * connective column structure of the base is preserved, as is horizontal scroll.
 * Same props/behavior as {@link BracketViewProps}; all colors from `--xen-*`
 * token classes (no literals).
 */
export const BracketViewV4 = React.forwardRef<HTMLDivElement, BracketViewV4Props>(
  function BracketViewV4(
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
      const win = Boolean(slot.winner);
      return (
        <div
          className={cn(
            'flex items-center justify-between gap-2 rounded-[var(--xen-radius-sm)] px-2 py-1',
            win && 'bg-primary/10'
          )}
        >
          <div className="flex flex-1 items-center gap-2">
            {win ? (
              <span aria-hidden="true" className="text-xs font-bold text-primary">
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
                named ? (win ? 'text-primary' : 'text-on-surface') : 'italic text-muted',
                win ? 'font-extrabold' : 'font-medium'
              )}
            >
              {named ? slot.name : 'TBD'}
            </span>
          </div>
          {slot.score !== undefined ? (
            <span
              className={cn(
                'text-sm font-extrabold',
                win ? 'text-primary' : 'text-on-surface'
              )}
            >
              {slot.score}
            </span>
          ) : null}
        </div>
      );
    };

    const renderRound = (round: BracketRound, ri: number): React.ReactElement => (
      <div
        key={`${round.title}-${ri}`}
        className="flex w-44 flex-col justify-around gap-4"
      >
        <span className="text-center text-xs font-extrabold uppercase tracking-wide text-muted">
          {round.title}
        </span>
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
                'flex flex-col gap-1 rounded-[var(--xen-radius-md)] border border-border bg-surface p-2 shadow-sm',
                onSelectMatch && FOCUS_RING
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
    );

    return (
      <div ref={ref} className={cn('flex gap-6 overflow-x-auto p-1', className)} {...rest}>
        {rounds.map(renderRound)}
      </div>
    );
  }
);

export type { BracketSlot, BracketMatch, BracketRound };
