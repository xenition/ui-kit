import * as React from 'react';
import { cn } from '../primitives/cn';
import type { ReactionBarProps } from './ReactionBar';

/** Drop-in for {@link ReactionBarProps} — same props, the V4 "feed" design. */
export type ReactionBarV4Props = ReactionBarProps;

/**
 * ReactionBar — **V4** "feed" design (web parity of the native V4). A clean wrap
 * of emoji reaction pills, each with a count. The selected reaction highlights
 * with a soft-primary tint pill (`bg-primary/10`, primary border + count); the
 * rest read on a plain surface with a `muted` count. A trailing `+` opens a
 * fuller picker upstream, and the empty tally is handled too. Same props/behavior
 * as {@link ReactionBarProps}; all colors from `--xen-*` token classes (no
 * literals), `aria-pressed` per pill.
 */
export const ReactionBarV4 = React.forwardRef<HTMLDivElement, ReactionBarV4Props>(
  function ReactionBarV4(
    { reactions, onReact, onAddReaction, emptyLabel = 'No reactions yet', className, ...rest },
    ref
  ) {
    if (reactions.length === 0 && !onAddReaction) {
      return (
        <div ref={ref} className={cn('text-sm text-muted', className)} {...rest}>
          {emptyLabel}
        </div>
      );
    }

    return (
      <div ref={ref} className={cn('flex flex-wrap items-center gap-xs', className)} {...rest}>
        {reactions.map((r) => {
          const selected = !!r.reacted;
          return (
            <button
              key={r.key}
              type="button"
              aria-label={`${r.label ?? r.key}${r.count != null ? `, ${r.count}` : ''}`}
              aria-pressed={selected}
              disabled={!onReact}
              onClick={onReact ? () => onReact(r.key) : undefined}
              className={cn(
                'inline-flex min-h-[44px] items-center gap-xs rounded-full border px-md transition-colors',
                'disabled:pointer-events-none',
                selected
                  ? 'border-primary bg-primary/10 hover:bg-primary/20'
                  : 'border-border bg-surface hover:bg-primary/10'
              )}
            >
              <span className="text-base leading-none" aria-hidden="true">
                {r.emoji}
              </span>
              {r.count != null ? (
                <span className={cn('text-xs font-semibold', selected ? 'text-primary' : 'text-muted')}>
                  {r.count}
                </span>
              ) : null}
            </button>
          );
        })}
        {onAddReaction ? (
          <button
            type="button"
            aria-label="Add reaction"
            onClick={onAddReaction}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-border bg-surface px-md text-base font-bold text-muted transition-colors hover:bg-primary/10"
          >
            +
          </button>
        ) : null}
      </div>
    );
  }
);
