import * as React from 'react';
export interface OnboardingStep {
    label: string;
    done: boolean;
    /** Optional supporting line under the label. */
    description?: string;
    /** Fires when the row is clicked (e.g. to jump into that step). */
    onClick?: () => void;
}
export interface OnboardingChecklistProps extends React.HTMLAttributes<HTMLDivElement> {
    steps: OnboardingStep[];
    /** Heading; defaults to "Get started". */
    title?: string;
}
/**
 * A getting-started checklist with a completion meter (design.md §42): a
 * progress bar + "N of M" count over a list of steps, each showing a check when
 * done. Completed steps are struck-through and muted. Token-only.
 */
export declare const OnboardingChecklist: React.ForwardRefExoticComponent<OnboardingChecklistProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=OnboardingChecklist.d.ts.map