import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type SemanticColors } from '../theme';
/** Which shared chart to render. */
export type YieldChartVariant = 'bars' | 'line';
export interface YieldChartProps {
    /** Yield samples per period (e.g. t/ha per season). Empty → muted note. */
    data: number[];
    /** Labels under each period (bars only). Passed through; guarded per bar. */
    labels?: string[];
    /** Card title. Default "Yield". */
    title?: string;
    /** Pre-formatted headline figure (e.g. "4.8 t/ha"). */
    headline?: string;
    /** Unit suffix for the headline (e.g. "avg"). */
    unit?: string;
    /** Which shared chart to reuse. Default `'bars'`. */
    variant?: YieldChartVariant;
    /** Series color slot. Default `'success'`. */
    color?: keyof SemanticColors;
    /** Plot height in px. Default 140. */
    height?: number;
    style?: StyleProp<ViewStyle>;
}
/**
 * A yield visualization — a titled {@link Card} that reuses the shared
 * {@link BarChart} (`variant='bars'`) or {@link LineChart} (`variant='line'`);
 * no new chart code. The header carries an optional `headline` + `unit`. An
 * empty `data` array renders a muted "No yield data yet" note instead of an
 * axis. Series color keys off a `SemanticColors` slot. Token-bound throughout —
 * no literal colors.
 */
export declare function YieldChart({ data, labels, title, headline, unit, variant, color, height, style, }: YieldChartProps): React.ReactElement;
//# sourceMappingURL=YieldChart.d.ts.map