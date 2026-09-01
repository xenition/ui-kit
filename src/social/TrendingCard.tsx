import * as React from 'react';
import { cn } from '../primitives/cn';

export interface TrendingCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Position in the trending list (e.g. `1`). Shown as a muted `#N ·` prefix. */
  rank?: number;
  /** Category / context line above the topic (e.g. `Trending in Tech`). */
  category?: string;
  /** The trending topic — a hashtag (`#Xenition`) or a phrase. Shown bold. */
  topic: string;
  /** Formatted post count shown as a big muted numeral (e.g. `12.4K posts`). */
  postCount?: string;
  /** Fires when the card is activated (keyboard + pointer). */
  onPress?: () => void;
  /** Fires when the overflow `⋯` menu is tapped. Renders the menu button when set. */
  onMenu?: () => void;
}

/**
 * TrendingCard — **V4** "feed" design. A clean, airy trending-topic card: a
 * muted `#rank · category` context line, the bold `topic`, and the `postCount`
 * as a big muted numeral. An optional `⋯` menu sits at the top-right. Pressed
 * state uses a soft-primary tint. Presentational; token-only colors via
 * `--xen-*` classes. Web parity of the native `TrendingCard`. When `onPress`
 * is set the root is a keyboard-operable `role="button"`.
 */
export const TrendingCard = React.forwardRef<HTMLDivElement, TrendingCardProps>(function TrendingCard(
  { rank, category, topic, postCount, onPress, onMenu, className, ...rest },
  ref
) {
  const context = [rank != null ? `#${rank}` : null, category].filter(Boolean).join(' · ');

  const inner = (
    <>
      <div className="flex min-w-0 flex-1 flex-col gap-xs">
        {context ? <span className="truncate text-xs font-semibold text-muted">{context}</span> : null}
        <span className="truncate text-base font-extrabold text-on-surface">{topic}</span>
        {postCount ? <span className="text-2xl font-extrabold tabular-nums text-muted">{postCount}</span> : null}
      </div>
      {onMenu ? (
        <button
          type="button"
          aria-label="More options"
          onClick={(e) => {
            e.stopPropagation();
            onMenu();
          }}
          className="-mr-xs -mt-xs flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg font-bold text-muted transition-colors hover:bg-primary/10"
        >
          ⋯
        </button>
      ) : null}
    </>
  );

  const cardClass = cn(
    'flex items-start gap-sm rounded-[var(--xen-radius-lg)] border border-border bg-surface p-lg shadow-sm',
    className
  );

  const a11yLabel = [context, topic, postCount].filter(Boolean).join(', ');

  if (onPress) {
    return (
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        aria-label={a11yLabel}
        onClick={onPress}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onPress();
          }
        }}
        className={cn(cardClass, 'min-h-[44px] cursor-pointer transition-colors hover:bg-primary/10')}
        {...rest}
      >
        {inner}
      </div>
    );
  }

  return (
    <div ref={ref} role="listitem" aria-label={a11yLabel} className={cardClass} {...rest}>
      {inner}
    </div>
  );
});
