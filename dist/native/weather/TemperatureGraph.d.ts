import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { SemanticColors } from '../theme';
export interface TemperatureGraphProps {
    /** Temperature series (one value per period). */
    data: number[];
    /** X-axis tick labels aligned to `data` (e.g. hours). Optional. */
    labels?: string[];
    /** Unit suffix for the min/max annotations. Default `'°'`. */
    unit?: string;
    /** Card title. Default `'Temperature'`. */
    title?: string;
    /** Line color token key. Default `'primary'`. */
    color?: keyof SemanticColors;
    /** Plot height in px. Default `160`. */
    height?: number;
    /** Plot width in px. Default `300`. */
    width?: number;
    /** Message shown when `data` is empty. */
    emptyLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Temperature trend graph — a thin wrapper over the shared `LineChart` that adds
 * a titled card, min/max annotations, and optional x-axis labels. The line color
 * is a semantic token key (default `primary`); the chart itself is token-bound
 * and handles the empty/flat/single-point cases. Renders a muted empty state
 * when `data` is empty. All colors/sizes come from the compiled theme tokens via
 * `useXenitionTheme()` — no literal colors.
 */
export declare function TemperatureGraph({ data, labels, unit, title, color, height, width, emptyLabel, style, }: TemperatureGraphProps): React.ReactElement;
//# sourceMappingURL=TemperatureGraph.d.ts.map