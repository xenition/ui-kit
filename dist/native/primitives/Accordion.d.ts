import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface AccordionItemData {
    value: string;
    title: React.ReactNode;
    content: React.ReactNode;
}
export interface AccordionProps {
    items: AccordionItemData[];
    /** `single` keeps one panel open; `multiple` allows many (default single). */
    type?: 'single' | 'multiple';
    /** Values open on first render. */
    defaultValue?: string[];
    style?: StyleProp<ViewStyle>;
}
/**
 * Themed collapsible sections — the native mirror of the web `Accordion`. No
 * modal: sections expand/collapse inline, animated with `LayoutAnimation`.
 * Supports `single` (one open) and `multiple` like the web version. No literal
 * colors.
 */
export declare function Accordion({ items, type, defaultValue, style, }: AccordionProps): React.ReactElement;
//# sourceMappingURL=Accordion.d.ts.map