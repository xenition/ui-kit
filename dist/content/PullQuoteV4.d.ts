import * as React from 'react';
import type { PullQuoteProps } from './PullQuote';
export interface PullQuoteV4Props extends PullQuoteProps {
    /**
     * Replace the whole figure's spoken form with one line.
     *
     * Omitted by default, and that default is the fix: the figure carries no
     * label, so the `<blockquote>` and its `<figcaption>` are read once, in
     * order, with real quotation semantics. Supply this only when the quote
     * needs different words spoken than shown — the subtree is then hidden, so
     * it is still read exactly once.
     */
    formatQuote?: (quote: string, attribution?: string) => string;
}
/**
 * **V4 pull quote** — the web twin of the native `PullQuoteV4`, same props as
 * {@link PullQuote} plus `formatQuote`.
 *
 * ## Two changes
 *
 * 1. **The quote is read once.** The base put an `aria-label` duplicating the
 *    quote onto a `<figure>` that then rendered the same words in a
 *    `<blockquote>`. Because a native label *replaces* its subtree and a web
 *    one is announced *beside* it, the same props read the quote a different
 *    number of times per platform — twice on web, once on native. The label is
 *    gone; `formatQuote` is the deliberate way back to a single spoken line,
 *    and it hides the subtree when used.
 * 2. **The attribution takes `mutedText`**, the contrast-corrected ink slot,
 *    where the base inked it with the `muted` fill.
 */
export declare const PullQuoteV4: React.ForwardRefExoticComponent<PullQuoteV4Props & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=PullQuoteV4.d.ts.map