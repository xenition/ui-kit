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
/**
 * Horizontal step indicator bound to the theme tokens — for wizards/checkout.
 *
 * **This is a progress indicator, not an instruction list.** Each step gets
 * `flex-1` of the row, so it is at its best with three or four one-word titles
 * ("Cart · Shipping · Pay") and falls apart past that: at eight steps every
 * title collapses to nothing, and there is nowhere to put a body.
 *
 * If what you have is *content* — a recipe method, an onboarding checklist
 * body, a setup guide — reach for {@link StepList} instead. It is the vertical
 * sibling: same numbering, but it grows downward and each step carries a title
 * and a description. `Steps` answers "where am I in this flow"; `StepList`
 * answers "here are the instructions".
 */
export declare function Steps({ steps, current, className }: StepsProps): React.ReactElement;
//# sourceMappingURL=Steps.d.ts.map