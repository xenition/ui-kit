import * as React from 'react';
import { cn } from '../primitives/cn';

export interface PollOption {
  id: string;
  label: string;
  /** Vote tally for this option. */
  votes?: number;
}

export interface PollProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The poll question. */
  question: string;
  /** Answer options. */
  options: ReadonlyArray<PollOption>;
  /** The option the viewer voted for (controlled). Presence flips to results. */
  votedOptionId?: string;
  /** Poll is closed — always show results, disable voting. */
  closed?: boolean;
  /** Fires with the option id when the viewer votes. */
  onVote?: (id: string) => void;
  /** Footer meta (e.g. `1,204 votes · 2d left`). Auto-derived if omitted. */
  meta?: string;
}

/**
 * A click-to-vote poll with three states: open (clickable options), voted, and
 * closed. Once voted or closed each option becomes a labeled percentage bar,
 * the viewer's pick is tinted primary, and the leading option is emphasized.
 * Guards an all-zero tally. Web parity of the native `Poll`; token-only,
 * `role="radiogroup"`/`role="radio"` semantics.
 */
export const Poll = React.forwardRef<HTMLDivElement, PollProps>(function Poll(
  { question, options, votedOptionId, closed = false, onVote, meta, className, ...rest },
  ref
) {
  const total = options.reduce((sum, o) => sum + (o.votes ?? 0), 0);
  const showResults = closed || votedOptionId != null;
  const leadVotes = options.reduce((max, o) => Math.max(max, o.votes ?? 0), 0);

  const derivedMeta =
    meta ?? `${total.toLocaleString()} ${total === 1 ? 'vote' : 'votes'}${closed ? ' · Final' : ''}`;

  return (
    <div
      ref={ref}
      role="radiogroup"
      aria-label={question}
      className={cn('flex flex-col gap-sm rounded-lg border border-border bg-surface p-md', className)}
      {...rest}
    >
      <p className="text-base font-bold text-on-surface">{question}</p>

      {options.map((o) => {
        const votes = o.votes ?? 0;
        const pct = total > 0 ? Math.round((votes / total) * 100) : 0;
        const selected = votedOptionId === o.id;
        const leading = showResults && votes === leadVotes && leadVotes > 0;

        if (showResults) {
          return (
            <div
              key={o.id}
              role="radio"
              aria-checked={selected}
              aria-label={`${o.label}, ${pct}%`}
              className={cn(
                'relative overflow-hidden rounded-md border',
                selected ? 'border-primary' : 'border-border'
              )}
            >
              {/* Filled results bar (token-only tint). */}
              <div
                className={cn('absolute inset-y-0 left-0', selected ? 'bg-primary opacity-20' : 'bg-neutral-100')}
                style={{ width: `${pct}%` }}
                aria-hidden="true"
              />
              <div className="relative flex items-center justify-between px-md py-sm">
                <span className={cn('text-sm text-on-surface', leading ? 'font-bold' : 'font-medium')}>
                  {selected ? `✓ ${o.label}` : o.label}
                </span>
                <span className="text-sm font-bold text-on-surface">{pct}%</span>
              </div>
            </div>
          );
        }

        return (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={false}
            aria-label={o.label}
            disabled={!onVote}
            onClick={onVote ? () => onVote(o.id) : undefined}
            className={cn(
              'rounded-md border border-primary bg-surface px-md py-sm text-center text-sm font-semibold text-primary transition-colors',
              'hover:bg-primary hover:text-on-primary',
              'disabled:pointer-events-none'
            )}
          >
            {o.label}
          </button>
        );
      })}

      <p className="text-xs text-muted">{derivedMeta}</p>
    </div>
  );
});
