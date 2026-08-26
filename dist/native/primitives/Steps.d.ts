import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface StepItem {
    title: React.ReactNode;
    description?: React.ReactNode;
}
export interface StepsProps {
    steps: StepItem[];
    /** Zero-based index of the active step. */
    current: number;
    style?: StyleProp<ViewStyle>;
}
/**
 * Horizontal step indicator — the native mirror of the web `Steps`. A row of
 * numbered/checked markers with titles; done steps fill with the primary color,
 * the active step is outlined. For wizards/checkout. No literal colors.
 *
 * **This is a progress indicator, not an instruction list.** Each step gets
 * `flex: 1` of the row, so it is at its best with three or four one-word
 * titles ("Cart · Shipping · Pay") and falls apart past that: at eight steps
 * every title collapses to nothing, and there is nowhere to put a body.
 *
 * If what you have is *content* — a recipe method, an onboarding checklist
 * body, a setup guide — reach for {@link StepList} instead. It is the vertical
 * sibling: same numbering, but it grows downward and each step carries a title
 * and a description. `Steps` answers "where am I in this flow"; `StepList`
 * answers "here are the instructions".
 */
export declare function Steps({ steps, current, style }: StepsProps): React.ReactElement;
//# sourceMappingURL=Steps.d.ts.map