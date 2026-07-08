import * as React from 'react';
export type FAQProps = React.HTMLAttributes<HTMLDivElement>;
/** Container for `FAQItem`s (divided list). */
export declare const FAQ: React.ForwardRefExoticComponent<FAQProps & React.RefAttributes<HTMLDivElement>>;
export interface FAQItemProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The question line (button text). */
    question: React.ReactNode;
    /** Initially expanded. */
    defaultOpen?: boolean;
}
/**
 * Accessible accordion item: a `<button aria-expanded aria-controls>`
 * toggling a labelled region, with a smooth height animation via the CSS
 * grid `0fr → 1fr` trick (no measuring). The animation is dropped under
 * `prefers-reduced-motion`.
 */
export declare const FAQItem: React.ForwardRefExoticComponent<FAQItemProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FAQ.d.ts.map