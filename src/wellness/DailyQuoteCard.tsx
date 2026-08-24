import * as React from 'react';
import { cn } from '../primitives/cn';
import { Skeleton } from '../primitives';
import { CARD_SHELL, SLOT_TEXT, type WellnessSlot } from './_tokens';

export type DailyQuoteTone = 'primary' | 'accent' | 'success';

const TONE_KEY: Record<DailyQuoteTone, WellnessSlot> = {
  primary: 'primary',
  accent: 'accent',
  success: 'success',
};

export interface DailyQuoteCardProps {
  /** The quote text (without surrounding quotation marks). */
  quote?: string;
  /** Attribution. */
  author?: string;
  /** Small category / theme eyebrow, e.g. "Presence". */
  category?: string;
  /** Accent tone. Default `'primary'`. */
  tone?: DailyQuoteTone;
  /** Whether the quote is saved (fills the favorite control). */
  favorited?: boolean;
  /** Render a placeholder skeleton. */
  loading?: boolean;
  /** Fires when the favorite control is tapped, with the next state. */
  onFavorite?: (next: boolean) => void;
  /** Fires when the share control is tapped (omit to hide it). */
  onShare?: () => void;
  /** Note shown when there is no quote. Default "No quote today.". */
  emptyLabel?: string;
  className?: string;
}

/**
 * A daily inspiration card (web parity of the native block): a tinted quote
 * mark, the quote and author, an optional category eyebrow, and favorite / share
 * controls as real `<button>`s. `favorited` flips the heart glyph and its
 * `aria-pressed` (state, not color alone); `loading` renders a skeleton and a
 * missing quote shows an empty note. Token-only colors.
 */
export const DailyQuoteCard = React.forwardRef<HTMLDivElement, DailyQuoteCardProps>(function DailyQuoteCard(
  {
    quote,
    author,
    category,
    tone = 'primary',
    favorited = false,
    loading = false,
    onFavorite,
    onShare,
    emptyLabel = 'No quote today.',
    className,
  },
  ref
) {
  const slot = TONE_KEY[tone] ?? 'primary';
  const shell = cn(CARD_SHELL, 'flex flex-col gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]', className);

  if (loading) {
    return (
      <div ref={ref} data-xen-daily-quote-card="" aria-busy="true" aria-label="Loading quote" className={shell}>
        <Skeleton width="90%" height={20} />
        <Skeleton width="75%" height={20} />
        <Skeleton width="40%" height={14} />
      </div>
    );
  }

  if (!quote) {
    return (
      <div
        ref={ref}
        data-xen-daily-quote-card=""
        aria-label={emptyLabel}
        className={cn(shell, 'items-center')}
      >
        <span aria-hidden="true" className="text-xl">
          🕊️
        </span>
        <span className="text-sm text-muted">{emptyLabel}</span>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      data-xen-daily-quote-card=""
      aria-label={`Quote${author ? ` by ${author}` : ''}: ${quote}`}
      className={shell}
    >
      {category ? (
        <span className={cn('text-xs font-bold uppercase tracking-wide', SLOT_TEXT[slot])}>{category}</span>
      ) : null}

      <div className="flex gap-[var(--xen-space-sm)]">
        <span aria-hidden="true" className={cn('text-2xl leading-none opacity-50', SLOT_TEXT[slot])}>
          “
        </span>
        <p className="flex-1 text-lg font-semibold leading-relaxed text-on-surface">{quote}</p>
      </div>

      {author ? <p className="text-sm italic text-muted">— {author}</p> : null}

      {onFavorite || onShare ? (
        <div className="flex gap-[var(--xen-space-md)]">
          {onFavorite ? (
            <button
              type="button"
              aria-pressed={favorited}
              aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
              onClick={() => onFavorite(!favorited)}
              className={cn(
                'text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
                favorited ? 'text-danger' : 'text-muted'
              )}
            >
              {favorited ? '♥' : '♡'}
            </button>
          ) : null}
          {onShare ? (
            <button
              type="button"
              aria-label="Share quote"
              onClick={onShare}
              className="text-lg text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
            >
              ↗
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
});
