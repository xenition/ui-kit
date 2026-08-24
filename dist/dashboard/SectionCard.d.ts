import * as React from 'react';
export interface SectionCardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Section heading. */
    title: string;
    /** Optional muted description under the title. */
    subtitle?: string;
    /** Trailing header slot, e.g. a "See all" link. */
    action?: React.ReactNode;
    /** Optional divider between the header and the body. */
    divided?: boolean;
    children: React.ReactNode;
}
/**
 * A titled card wrapper: a header row (title + optional subtitle + trailing
 * action) above a body slot, inside a bordered `surface` card. The standard
 * container for grouping dashboard content. Token-only.
 */
export declare const SectionCard: React.ForwardRefExoticComponent<SectionCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SectionCard.d.ts.map