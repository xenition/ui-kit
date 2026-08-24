import * as React from 'react';
export interface StickyProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Which edge to stick to. Defaults to `top`. */
    side?: 'top' | 'bottom';
    /** Offset in px from the sticky edge. Defaults to 0. */
    offset?: number;
}
/**
 * Wraps its children in a `position: sticky` box pinned to the `top` (or
 * `bottom`) edge of the nearest scrolling ancestor, offset by `offset` px. The
 * offset is a numeric layout literal; no literal colors.
 */
export declare const Sticky: React.ForwardRefExoticComponent<StickyProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Sticky.d.ts.map