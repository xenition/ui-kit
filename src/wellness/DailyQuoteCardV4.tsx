import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import type { DailyQuoteCardProps } from './DailyQuoteCard';

export type DailyQuoteCardV4Props = DailyQuoteCardProps;

/**
 * DailyQuoteCardV4 — the "calm" restyle of {@link DailyQuoteCard}. Same props,
 * defaults, labels, a11y and behavior; the whole card becomes a soft gradient
 * ground: the quote in near-white ink (`text-on-primary`), the author/category
 * eyebrow in the softer ink (`text-primary-100`), and favorite/share as frosted
 * (`bg-primary-500`) round icon buttons. `favorited` flips the heart glyph and
 * its `aria-pressed` (state, not color alone); `loading` shows frosted skeleton
 * bars and a missing quote shows the empty note. The `tone` prop is retained for
 * parity; the calm ground is single-hue. Token-only colors.
 */
export const DailyQuoteCardV4 = React.forwardRef<
  HTMLDivElement,
  DailyQuoteCardV4Props & React.HTMLAttributes<HTMLDivElement>
>(function DailyQuoteCardV4(
  {
    quote,
    author,
    category,
    // tone retained in the public props for parity; the calm ground is single-hue.
    tone = 'primary',
    favorited = false,
    loading = false,
    onFavorite,
    onShare,
    emptyLabel = 'No quote today.',
    className,
    ...rest
  },
  ref
) {
  void tone;
  const ground =
    'flex flex-col gap-[var(--xen-space-md)] overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-400 to-primary-700 p-[var(--xen-space-lg)]';

  if (loading) {
    return (
      <div ref={ref} data-xen-daily-quote-card="" aria-busy="true" aria-label="Loading quote" className={cn(ground, className)} {...rest}>
        <div className="h-5 w-[90%] rounded-[var(--xen-radius-sm)] bg-primary-500" />
        <div className="h-5 w-[75%] rounded-[var(--xen-radius-sm)] bg-primary-500" />
        <div className="h-3.5 w-[40%] rounded-[var(--xen-radius-sm)] bg-primary-500" />
      </div>
    );
  }

  if (!quote) {
    return (
      <div ref={ref} data-xen-daily-quote-card="" aria-label={emptyLabel} className={cn(ground, 'items-center')} {...rest}>
        <span aria-hidden="true" className="text-xl">
          🕊️
        </span>
        <span className="text-sm text-primary-100">{emptyLabel}</span>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      data-xen-daily-quote-card=""
      aria-label={`Quote${author ? ` by ${author}` : ''}: ${quote}`}
      className={cn(ground, className)}
      {...rest}
    >
      {category ? (
        <span className="text-xs font-bold uppercase tracking-wide text-primary-100">{category}</span>
      ) : null}

      <p className="text-lg font-bold leading-relaxed text-on-primary">{`“${quote}”`}</p>

      {author ? <p className="text-sm italic text-primary-100">— {author}</p> : null}

      {onFavorite || onShare ? (
        <div className="flex gap-[var(--xen-space-sm)]">
          {onFavorite ? (
            <button
              type="button"
              aria-pressed={favorited}
              aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
              onClick={() => onFavorite(!favorited)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
            >
              <Icon glyph={favorited ? '♥' : '♡'} size="lg" color="onPrimary" />
            </button>
          ) : null}
          {onShare ? (
            <button
              type="button"
              aria-label="Share quote"
              onClick={onShare}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
            >
              <Icon glyph="↗" size="lg" color="onPrimary" />
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
});
