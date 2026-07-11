import * as React from 'react';
export interface ProcessStep {
    /** Step headline. */
    title: React.ReactNode;
    /** Supporting copy under the title. */
    description?: React.ReactNode;
    /** Optional icon rendered inside the numbered marker instead of the number. */
    icon?: React.ReactNode;
}
export interface ProcessStepsProps extends React.HTMLAttributes<HTMLOListElement> {
    /** Ordered "how it works" steps. */
    steps: ProcessStep[];
}
/** Numbered "how it works" flow — horizontal on desktop, vertical on mobile, with connectors. */
export declare const ProcessSteps: React.ForwardRefExoticComponent<ProcessStepsProps & React.RefAttributes<HTMLOListElement>>;
//# sourceMappingURL=ProcessSteps.d.ts.map