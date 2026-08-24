import * as React from 'react';
import type { ChartColor } from '../charts';
/** Which shared chart to render. */
export type YieldChartVariant = 'bars' | 'line';
export interface YieldChartProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
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
    /** Series color token. Default `'success'`. */
    color?: ChartColor;
    /** Plot height in px. Default 140. */
    height?: number;
}
/**
 * A yield visualization — a titled {@link Card} that reuses the shared
 * {@link BarChart} (`variant='bars'`) or {@link LineChart} (`variant='line'`);
 * no new chart code. The header carries an optional `headline` + `unit`. An
 * empty `data` array renders a muted "No yield data yet" note instead of an
 * axis. Series color keys off a {@link ChartColor} token. Token-bound
 * throughout — no literal colors.
 */
export declare const YieldChart: React.ForwardRefExoticComponent<YieldChartProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=YieldChart.d.ts.map