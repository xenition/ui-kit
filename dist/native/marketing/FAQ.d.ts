import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface FAQItemData {
    /** The question line (toggle button text). */
    question: string;
    /** The answer body, revealed when expanded. */
    answer: React.ReactNode;
}
export interface FAQProps {
    /** Q/A pairs (mirrors the web `FAQItem` children). */
    items: FAQItemData[];
    /** Allow multiple panels open at once (default: single). */
    multiple?: boolean;
    /** Questions expanded on first render. */
    defaultOpen?: string[];
    style?: StyleProp<ViewStyle>;
}
/**
 * Accordion of question/answer rows — the native mirror of the web `FAQ` +
 * `FAQItem`. The web version composes children and animates height with the CSS
 * grid `0fr → 1fr` trick; native takes an `items` data array and expands inline
 * with `LayoutAnimation` (same idiom as the native `Accordion` primitive).
 * Token-only.
 */
export declare function FAQ({ items, multiple, defaultOpen, style, }: FAQProps): React.ReactElement;
//# sourceMappingURL=FAQ.d.ts.map