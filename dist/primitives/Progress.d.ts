import * as React from 'react';
export type ProgressTone = 'primary' | 'success' | 'warn' | 'danger';
export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Current value. */
    value: number;
    /** Maximum value (default 100). */
    max?: number;
    tone?: ProgressTone;
    /** Bar thickness. */
    size?: 'sm' | 'md';
}
/** Linear progress bar bound to the theme tokens. Clamps to [0, max]. */
export declare const Progress: React.ForwardRefExoticComponent<ProgressProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Progress.d.ts.map