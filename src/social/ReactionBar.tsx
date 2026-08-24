import * as React from 'react';
import { cn } from '../primitives/cn';

export interface Reaction {
  /** Stable key for the reaction type (e.g. `'like'`, `'love'`). */
  key: string;
  /** Emoji/glyph shown for the reaction. */
  emoji: string;
  /** Count for this reaction. */
  count?: number;
  /** Whether the viewer has selected this reaction. */
  reacted?: boolean;
  /** Accessible label (e.g. `'Love'`). Falls back to `key`. */
  label?: string;
}

export interface ReactionBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The reaction tallies to render. */
  reactions: ReadonlyArray<Reaction>;
  /** Fires with the reaction key when a pill is clicked. */
  onReact?: (key: string) => void;
  /** Renders a trailing `+` add-reaction affordance. */
  onAddReaction?: () => void;
  /** Message shown when `reactions` is empty and there's no add affordance. */
  emptyLabel?: string;
}

/**
 * A wrap of emoji reaction pills, each with a count and a selected state.
 * Selected pills fill with the primary color; the rest read on-surface. An
 * optional `+` opens a fuller picker upstream. Handles the empty tally too.
 * Web parity of the native `ReactionBar`; token-only, `aria-pressed` per pill.
 */
export const ReactionBar = React.forwardRef<HTMLDivElement, ReactionBarProps>(
  function ReactionBar(
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
                'inline-flex items-center gap-xs rounded-full border px-sm py-0.5 transition-opacity hover:opacity-80',
                'disabled:pointer-events-none',
                selected ? 'border-primary bg-primary' : 'border-border bg-surface'
              )}
            >
              <span className="text-sm leading-none" aria-hidden="true">
                {r.emoji}
              </span>
              {r.count != null ? (
                <span
                  className={cn('text-xs font-semibold', selected ? 'text-on-primary' : 'text-on-surface')}
                >
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
            className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-sm py-0.5 text-sm font-bold text-muted transition-opacity hover:opacity-80"
          >
            +
          </button>
        ) : null}
      </div>
    );
  }
);
