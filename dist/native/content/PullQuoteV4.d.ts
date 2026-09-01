import * as React from 'react';
import type { PullQuoteProps } from './PullQuote';
export interface PullQuoteV4Props extends PullQuoteProps {
    /**
     * The quote's accessible name. Default
     * ``(quote, attribution) => `Quote: ${quote}` `` plus `, ${attribution}`.
     */
    formatQuote?: (quote: string, attribution?: string) => string;
}
/**
 * **V4 pull quote** — same props as {@link PullQuote} plus `formatQuote`.
 *
 * ## Two changes
 *
 * 1. **The quote is read once.** The base hung a label duplicating the quote
 *    on a figure that then rendered the same words underneath it. A native
 *    label *replaces* its subtree and a web one does not, so a screen-reader
 *    user heard the quote once on a phone and twice on a laptop — from the
 *    same component with the same props. Both twins now name the quote exactly
 *    once, and the wording is a prop rather than a hard-coded `'Quote: '`.
 * 2. **The attribution takes `mutedText`**, not the `muted` fill it was set
 *    in.
 *
 * **Renders nothing without a quote** (§4.5).
 */
export declare function PullQuoteV4({ quote, attribution, variant, formatQuote, style, }: PullQuoteV4Props): React.ReactElement | null;
//# sourceMappingURL=PullQuoteV4.d.ts.map