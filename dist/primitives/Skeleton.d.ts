import * as React from 'react';
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Shape of the placeholder. */
    variant?: 'text' | 'rect' | 'circle';
    /** CSS width (e.g. '100%', 200). */
    width?: number | string;
    /** CSS height (e.g. '1rem', 40). */
    height?: number | string;
    /** For `text`: render N stacked lines (last one shorter). */
    lines?: number;
}
/** Shimmering loading placeholder bound to the theme tokens. */
export declare const Skeleton: React.ForwardRefExoticComponent<SkeletonProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Skeleton.d.ts.map