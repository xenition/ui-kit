import * as React from 'react';
export interface StepItem {
    title: React.ReactNode;
    description?: React.ReactNode;
}
export interface StepsProps {
    steps: StepItem[];
    /** Zero-based index of the active step. */
    current: number;
    className?: string;
}
/** Horizontal step indicator bound to the theme tokens — for wizards/checkout. */
export declare function Steps({ steps, current, className }: StepsProps): React.ReactElement;
//# sourceMappingURL=Steps.d.ts.map