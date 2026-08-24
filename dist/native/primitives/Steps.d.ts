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
 */
export declare function Steps({ steps, current, style }: StepsProps): React.ReactElement;
//# sourceMappingURL=Steps.d.ts.map