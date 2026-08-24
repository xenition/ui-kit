import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type SemanticColors } from '../theme';
export type ActivityRingColor = keyof SemanticColors;
export interface ActivityRing {
    /** Ring name, e.g. "Move". */
    label: string;
    /** Current value; clamped to `[0, goal]`. */
    value: number;
    /** Goal / full-ring value. */
    goal: number;
    /** Arc color (SemanticColors key). */
    color?: ActivityRingColor;
    /** Unit for the a11y summary, e.g. "kcal". */
    unit?: string;
}
export interface ActivityRingsProps {
    /** Concentric rings, drawn outermost-first. Typically 2–4. */
    rings: ActivityRing[];
    /** Outer diameter in px. */
    size?: number;
    /** Ring stroke width in px. */
    strokeWidth?: number;
    /** Gap between concentric rings in px. */
    gap?: number;
    /** Whether to show the labelled legend beside the rings. */
    showLegend?: boolean;
    /** Accessible summary override; a per-ring summary is generated otherwise. */
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Apple-style concentric activity rings drawn with `react-native-svg`. Each ring
 * is a `border` track plus a semantic-color arc (dash-array technique, starting
 * at 12 o'clock). Guards divide-by-zero per ring and renders a muted "No data"
 * note when `rings` is empty. The whole figure exposes one `accessibilityLabel`
 * summarizing every ring. Token-only colors.
 */
export declare function ActivityRings({ rings, size, strokeWidth, gap, showLegend, accessibilityLabel, style, }: ActivityRingsProps): React.ReactElement;
//# sourceMappingURL=ActivityRings.d.ts.map