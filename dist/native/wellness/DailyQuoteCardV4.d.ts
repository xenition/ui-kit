import * as React from 'react';
import type { DailyQuoteCardProps } from './DailyQuoteCard';
export type DailyQuoteCardV4Props = DailyQuoteCardProps;
/**
 * DailyQuoteCardV4 — the "calm" restyle of {@link DailyQuoteCard}. Same props,
 * defaults, labels, a11y and behavior; the whole card becomes a soft gradient
 * ground: the quote in near-white ink, the author/category eyebrow in the softer
 * ink, and favorite/share as frosted round icon buttons. `favorited` flips the
 * heart glyph and its a11y state; `loading` shows frosted skeleton bars and a
 * missing quote shows the empty note.
 */
export declare function DailyQuoteCardV4({ quote, author, category, tone, favorited, loading, onFavorite, onShare, emptyLabel, style, }: DailyQuoteCardV4Props): React.ReactElement;
//# sourceMappingURL=DailyQuoteCardV4.d.ts.map