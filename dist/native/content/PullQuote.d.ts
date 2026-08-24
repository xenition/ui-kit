import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type PullQuoteVariant = 'bordered' | 'block' | 'large';
export interface PullQuoteProps {
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
    style?: StyleProp<ViewStyle>;
}
/**
 * A pull quote / block quote for long-form articles — the visually emphasized
 * excerpt lifted out of the body. Three token-bound variants: a `bordered`
 * left-rule quote, a filled `block` card, and an oversized centered `large`
 * display quote. Rendered as an accessible quote for screen readers. All colors
 * come from `SemanticColors`; no literal hex.
 */
export declare function PullQuote({ quote, attribution, variant, style, }: PullQuoteProps): React.ReactElement;
//# sourceMappingURL=PullQuote.d.ts.map