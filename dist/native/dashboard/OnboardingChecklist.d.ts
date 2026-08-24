import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface OnboardingStep {
    label: string;
    done: boolean;
    /** Optional supporting line under the label. */
    description?: string;
    /** Fires when the row is pressed (e.g. to jump into that step). */
    onPress?: () => void;
}
export interface OnboardingChecklistProps {
    steps: OnboardingStep[];
    /** Heading; defaults to "Get started". */
    title?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A getting-started checklist with a completion meter (design.md §42): a
 * progress bar + "N of M" count over a list of steps, each showing a check when
 * done. Completed steps are struck-through and muted. Token-only.
 */
export declare function OnboardingChecklist({ steps, title, style, }: OnboardingChecklistProps): React.ReactElement;
//# sourceMappingURL=OnboardingChecklist.d.ts.map