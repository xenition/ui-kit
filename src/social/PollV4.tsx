import * as React from 'react';
import { cn } from '../primitives/cn';
import type { PollProps } from './Poll';

/** Drop-in for {@link PollProps} — same props, the V4 "feed" design. */
export type PollV4Props = PollProps;

/**
 * Poll — **V4** "feed" design (web parity of the native V4). Clean and airy with
 * a single primary accent: before voting, big (≥44px) tappable option rows;
 * after voting or when `closed`, each row becomes a soft-primary fill bar showing
 * the `%`, with the viewer's pick and the leading option emphasized in primary.
 * Keeps the total-votes + expiry caption and guards an all-zero tally. Same
 * props/behavior as {@link PollProps}; token-only, `role="radiogroup"`/
 * `role="radio"` semantics.
 */
export const PollV4 = React.forwardRef<HTMLDivElement, PollV4Props>(function PollV4(
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
      className={cn(
        'flex flex-col gap-sm rounded-[var(--xen-radius-lg)] border border-border bg-surface p-lg',
        className
      )}
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
                'relative flex min-h-[44px] items-center overflow-hidden rounded-full border',
                selected || leading ? 'border-primary' : 'border-border'
              )}
            >
              {/* Soft-primary results fill (token-only tint). */}
              <div
                className={cn(
                  'absolute inset-y-0 left-0',
                  selected || leading ? 'bg-primary/20' : 'bg-primary/10'
                )}
                style={{ width: `${pct}%` }}
                aria-hidden="true"
              />
              <div className="relative flex w-full items-center justify-between px-md py-sm">
                <span
                  className={cn(
                    'text-sm',
                    selected || leading ? 'font-bold text-primary' : 'font-medium text-on-surface'
                  )}
                >
                  {selected ? `✓ ${o.label}` : o.label}
                </span>
                <span
                  className={cn(
                    'text-sm font-bold',
                    selected || leading ? 'text-primary' : 'text-on-surface'
                  )}
                >
                  {pct}%
                </span>
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
              'flex min-h-[44px] items-center justify-center rounded-full bg-primary/10 px-md py-sm text-center text-sm font-semibold text-primary transition-colors',
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
