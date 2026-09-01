import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';
import { EmptyState } from '../commerce';
import type { PollResultBarProps } from './PollResultBar';

/** Drop-in for {@link PollResultBarProps} — same props, the V4 "focus" design. */
export type PollResultBarV4Props = PollResultBarProps;

/**
 * PollResultBar — **V4** "focus" design. The calm, legible take on a result
 * chart: tall (~44px) rounded rows on a soft-primary track, each filled to its
 * share of the vote in solid primary and trailed by a big percent numeral. The
 * **leading** option is emphasised (bolder label, solid-primary fill) and the
 * respondent's own pick keeps its primary border + spoken "your choice"; when
 * `showResults` is `false` and `onVote` is set the rows become vote buttons.
 * One accent (primary), no gradients. Same props/behavior as
 * {@link PollResultBarProps}; all colors from `--xen-*` token classes (no
 * literal colors). `0` total votes render every bar at 0% safely.
 */
export const PollResultBarV4 = React.forwardRef<HTMLDivElement, PollResultBarV4Props>(
  function PollResultBarV4(
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
                // Soft-primary track in results mode; a plain surface for voting.
                'relative min-h-[44px] overflow-hidden rounded-lg border',
                showResults ? 'bg-primary/10' : 'bg-surface',
                isPick ? 'border-primary' : 'border-border'
              )}
            >
              {/* Fill layer — primary width by %. The leader reads solid; the
                  rest a calmer 70% so the track stays visible behind the text. */}
              {showResults ? (
                <div
                  aria-hidden="true"
                  className={cn('absolute inset-y-0 left-0 bg-primary', isWinner ? 'opacity-100' : 'opacity-70')}
                  style={{ width: `${pct}%` }}
                />
              ) : null}

              <div className="relative flex min-h-[44px] items-center gap-sm px-md py-sm">
                {isPick ? (
                  <Icon glyph="✓" size="sm" color="primary" />
                ) : opt.icon ? (
                  <Icon glyph={opt.icon} size="base" color="onSurface" />
                ) : null}
                <span
                  className={cn(
                    'flex-1 text-base text-on-surface',
                    isPick || isWinner ? 'font-extrabold' : 'font-semibold'
                  )}
                >
                  {opt.label}
                </span>
                {showResults ? (
                  <span className="text-xl font-extrabold tabular-nums text-on-surface">{pct}%</span>
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
          <span className="text-sm font-semibold text-muted">
            {total} {total === 1 ? 'vote' : 'votes'}
          </span>
        ) : null}
      </div>
    );
  }
);
