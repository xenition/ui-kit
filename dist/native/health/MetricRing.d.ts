import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type SemanticColors } from '../theme';
import { type Appearance } from '../primitives/internal/appearance';
export type MetricRingColor = keyof SemanticColors;
export interface MetricRingProps {
    /** Metric name shown under the ring, e.g. "Move". */
    label: string;
    /** Current value; clamped to `[0, goal]`. */
    value: number;
    /** Goal / full-ring value. */
    goal: number;
    /** Unit shown in the caption, e.g. "kcal". */
    unit?: string;
    /** Ring arc color (SemanticColors key). */
    color?: MetricRingColor;
    /** Outer diameter in px. */
    size?: number;
    /** Center text override; defaults to the percentage. */
    centerLabel?: string;
    /**
     * Surface treatment for the outer container (the SVG ring is unaffected);
     * defaults to `classic` (no surface, the historical look).
     */
    appearance?: Appearance;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single labelled progress ring for one health metric — wraps the charts
 * {@link ProgressRing} and adds a value/goal caption below. When `goal <= 0`
 * it degrades to a muted "No goal set" note. `appearance` selects an optional
 * surface treatment for the outer container. The ring carries an
 * `accessibilityLabel`. Token-only colors.
 */
export declare function MetricRing({ label, value, goal, unit, color, size, centerLabel, appearance, style, }: MetricRingProps): React.ReactElement;
//# sourceMappingURL=MetricRing.d.ts.map