import * as React from 'react';
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
    className?: string;
}
/** Collapsible sections bound to the theme tokens. */
export declare function Accordion({ items, type, defaultValue, className, }: AccordionProps): React.ReactElement;
//# sourceMappingURL=Accordion.d.ts.map