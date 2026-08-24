import * as React from 'react';
export interface StaggerConfig {
    /** Delay increment between consecutive children, in ms. */
    interval: number;
    /** Base delay added to every child, in ms. */
    delay: number;
}
/** Provided by `Stagger`; consumed by `Reveal` to offset its delay. */
export declare const StaggerConfigContext: React.Context<StaggerConfig | null>;
/** Position of a child inside the nearest `Stagger`. */
export declare const StaggerIndexContext: React.Context<number>;
export interface StaggerProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Delay increment between consecutive children, in ms. */
    interval?: number;
    /** Base delay added to every child, in ms. */
    delay?: number;
}
/**
 * Applies incremental transition delays to child `Reveal`s so lists cascade
 * in. Non-`Reveal` children render untouched (they still advance the index,
 * keeping visual order stable when items are mixed).
 */
export declare const Stagger: React.ForwardRefExoticComponent<StaggerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Stagger.d.ts.map