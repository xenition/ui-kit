import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
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
    style?: StyleProp<ViewStyle>;
}
/**
 * A daily inspiration card: a tinted quote mark, the quote and author, an
 * optional category eyebrow, and favorite / share controls. `favorited` flips
 * the heart glyph and its a11y state (state, not color alone); `loading`
 * renders a skeleton and a missing quote shows an empty note. Token-only colors
 * (semantic slots + a `withAlpha` tint).
 */
export declare function DailyQuoteCard({ quote, author, category, tone, favorited, loading, onFavorite, onShare, emptyLabel, style, }: DailyQuoteCardProps): React.ReactElement;
//# sourceMappingURL=DailyQuoteCard.d.ts.map