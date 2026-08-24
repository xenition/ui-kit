import * as React from 'react';
export interface FeatureGridProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Column count at the largest breakpoint. */
    columns?: 2 | 3 | 4;
}
/** Responsive grid of `FeatureCard`s. */
export declare const FeatureGrid: React.ForwardRefExoticComponent<FeatureGridProps & React.RefAttributes<HTMLDivElement>>;
export interface FeatureCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Icon slot rendered in a tinted square. */
    icon?: React.ReactNode;
    title: React.ReactNode;
    /** Lift + shadow on hover. */
    hoverLift?: boolean;
}
/** One feature: icon slot, title, and body copy (children). */
export declare const FeatureCard: React.ForwardRefExoticComponent<FeatureCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FeatureGrid.d.ts.map