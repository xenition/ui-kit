import * as React from 'react';
export type DailyQuoteTone = 'primary' | 'accent' | 'success';
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
export declare const DailyQuoteCard: React.ForwardRefExoticComponent<DailyQuoteCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DailyQuoteCard.d.ts.map