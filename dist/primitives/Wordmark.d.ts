import * as React from 'react';
export type WordmarkSize = 'sm' | 'md' | 'lg';
export interface WordmarkProps extends React.HTMLAttributes<HTMLElement> {
    /** Brand name rendered in the heading font. */
    name: string;
    /**
     * Leading logomark slot. Omit for the default themed token square; pass an
     * icon/SVG to override, or `null` to render the name alone.
     */
    mark?: React.ReactNode;
    /** Type + mark scale (default `md`). */
    size?: WordmarkSize;
    /** Rendered element (default `span`; `a` for a linked header brand). */
    as?: 'span' | 'a';
    /** Destination when `as="a"`. */
    href?: string;
}
/** Themed brand wordmark — a token logomark plus the name in the heading font. */
export declare const Wordmark: React.ForwardRefExoticComponent<WordmarkProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=Wordmark.d.ts.map