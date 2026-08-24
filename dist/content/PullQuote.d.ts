import * as React from 'react';
export type PullQuoteVariant = 'bordered' | 'block' | 'large';
export interface PullQuoteProps extends React.HTMLAttributes<HTMLElement> {
    /** The quoted text (without surrounding quotation marks — added visually). */
    quote: string;
    /** Optional attribution, e.g. `'Ada Lovelace'`. */
    attribution?: string;
    /**
     * - `bordered` — accent left rule + italic quote (default).
     * - `block`    — filled surface card.
     * - `large`    — oversized display quote, centered.
     */
    variant?: PullQuoteVariant;
}
/**
 * A pull quote / block quote for long-form articles — the visually emphasized
 * excerpt lifted out of the body. Web (React DOM) mirror of the native
 * `PullQuote`. Three token-bound variants: a `bordered` left-rule quote, a
 * filled `block` card, and an oversized centered `large` display quote.
 * Rendered as a semantic `<figure><blockquote>`; all colors from `--xen-*`.
 */
export declare const PullQuote: React.ForwardRefExoticComponent<PullQuoteProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=PullQuote.d.ts.map