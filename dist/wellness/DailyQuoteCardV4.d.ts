import * as React from 'react';
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
export declare const DailyQuoteCardV4: React.ForwardRefExoticComponent<DailyQuoteCardProps & React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DailyQuoteCardV4.d.ts.map