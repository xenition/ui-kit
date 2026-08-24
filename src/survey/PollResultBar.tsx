import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';
import { EmptyState } from '../commerce';
import type { PollOption } from './types';

export interface PollResultBarProps {
  /** The tallied options. Empty renders the empty state. */
  options: PollOption[];
  /** The id the current user voted for (highlighted + check). */
  selectedId?: string | null;
  /**
   * Reveal percentages + fill bars. When `false` and `onVote` is set, rows are
   * clickable to cast a vote instead. Default `true`.
   */
  showResults?: boolean;
  /** Cast a vote for an option (used when `showResults` is `false`). */
  onVote?: (optionId: string) => void;
  /** Accessible name for the poll. Default `'Poll results'`. */
  'aria-label'?: string;
  className?: string;
}

/**
 * Poll result bars — one row per option with a proportional fill and a percent
 * of the total votes; the winning option and the user's own pick are
 * highlighted with the primary token and a check (the pick is also announced,
 * not color-only). When `showResults` is `false` and `onVote` is supplied the
 * rows become vote buttons. `0` total votes render every bar at 0% safely. No
 * literal colors.
 */
export const PollResultBar = React.forwardRef<HTMLDivElement, PollResultBarProps>(
  function PollResultBar(
    { options, selectedId, showResults = true, onVote, 'aria-label': ariaLabel = 'Poll results', className },
    ref
  ) {
    const total = options.reduce((sum, o) => sum + Math.max(0, o.votes), 0);
    const topVotes = options.reduce((m, o) => Math.max(m, o.votes), 0);

    if (options.length === 0) {
      return <EmptyState ref={ref} title="No poll options yet." className={className} />;
    }

    return (
      <div ref={ref} role="list" aria-label={ariaLabel} className={cn('flex flex-col gap-sm', className)}>
        {options.map((opt) => {
          const pct = total > 0 ? Math.round((Math.max(0, opt.votes) / total) * 100) : 0;
          const isPick = selectedId === opt.id;
          const isWinner = showResults && total > 0 && opt.votes === topVotes;
          const rowLabel = showResults
            ? `${opt.label}: ${pct}%${isPick ? ', your choice' : ''}`
            : opt.label;

          const inner = (
            <div
              aria-label={rowLabel}
              className={cn(
                'relative overflow-hidden rounded-md border bg-surface',
                isPick ? 'border-primary' : 'border-border'
              )}
            >
              {/* Fill layer (results mode only). */}
              {showResults ? (
                <div
                  aria-hidden="true"
                  className={cn('absolute inset-y-0 left-0 bg-primary', isWinner ? 'opacity-20' : 'opacity-10')}
                  style={{ width: `${pct}%` }}
                />
              ) : null}

              <div className="relative flex items-center gap-sm px-md py-sm">
                {isPick ? (
                  <Icon glyph="✓" size="sm" color="primary" />
                ) : opt.icon ? (
                  <Icon glyph={opt.icon} size="base" color="onSurface" />
                ) : null}
                <span
                  className={cn('flex-1 text-base text-on-surface', isPick || isWinner ? 'font-bold' : 'font-medium')}
                >
                  {opt.label}
                </span>
                {showResults ? (
                  <span className="text-base font-bold text-on-surface">{pct}%</span>
                ) : null}
              </div>
            </div>
          );

          if (!showResults && onVote) {
            return (
              <button
                key={opt.id}
                type="button"
                aria-label={`Vote for ${opt.label}`}
                onClick={() => onVote(opt.id)}
                className="block w-full text-left"
              >
                {inner}
              </button>
            );
          }
          return (
            <div key={opt.id} role="listitem">
              {inner}
            </div>
          );
        })}

        {showResults ? (
          <span className="text-xs text-muted">
            {total} {total === 1 ? 'vote' : 'votes'}
          </span>
        ) : null}
      </div>
    );
  }
);
