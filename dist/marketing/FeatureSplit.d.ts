import * as React from 'react';
export interface FeatureSplitProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
    /** Small kicker above the title. */
    eyebrow?: React.ReactNode;
    /** Feature headline. */
    title: React.ReactNode;
    /** Supporting copy under the title. */
    description?: React.ReactNode;
    /** Check-marked selling points. */
    bullets?: string[];
    /** Visual slot; omit for a seeded {@link GenerativeCover} placeholder. */
    media?: React.ReactNode;
    /** Flip the column order — media on the opposite side. */
    reverse?: boolean;
    /** Call-to-action slot under the copy. */
    action?: React.ReactNode;
}
/** Alternating image/text feature row — two columns on desktop, stacked on mobile. */
export declare const FeatureSplit: React.ForwardRefExoticComponent<FeatureSplitProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=FeatureSplit.d.ts.map