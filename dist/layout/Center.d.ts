import * as React from 'react';
export interface CenterProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Fill the parent (`flex-1`) so children center within all available space. */
    fill?: boolean;
}
/**
 * Centers its children on both axes. Optionally fills the parent so the
 * centering happens across all available space. Pure layout — no theme colors.
 */
export declare const Center: React.ForwardRefExoticComponent<CenterProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Center.d.ts.map