import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type SurveyProgressVariant = 'bar' | 'steps' | 'fraction';
export interface SurveyProgressProps {
    /** 1-based index of the current question. */
    current: number;
    /** Total number of questions. */
    total: number;
    /** Render style. Default `'bar'`. */
    variant?: SurveyProgressVariant;
    /** Show the `"Question X of Y"` caption above the indicator. Default `true`. */
    showLabel?: boolean;
    /** Override the caption text (e.g. localized). */
    label?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Survey completion indicator — `bar` wraps the token `Progress` primitive,
 * `steps` renders a segmented dot-per-question track, and `fraction` shows just
 * the `"X of Y"` caption. Exposes a `progressbar` role with min/max/now so
 * assistive tech can read completion. `current` is clamped into `[0, total]`.
 * No literal colors.
 */
export declare function SurveyProgress({ current, total, variant, showLabel, label, style, }: SurveyProgressProps): React.ReactElement;
//# sourceMappingURL=SurveyProgress.d.ts.map