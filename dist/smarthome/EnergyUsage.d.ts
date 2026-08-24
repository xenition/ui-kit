import * as React from 'react';
import type { ChartColor } from '../charts/internal';
export interface EnergyUsageProps {
    /** Per-period usage samples (e.g. kWh per day). */
    data: number[];
    /** Labels under each bar (e.g. weekday initials). Indexed defensively by BarChart. */
    labels?: string[];
    /** Card title. Default "Energy usage". */
    title?: string;
    /** Total for the period (pre-formatted or numeric). */
    total?: string | number;
    /** Unit suffix for the total (e.g. "kWh"). */
    unit?: string;
    /** Bar color token. Default `'primary'`. */
    color?: ChartColor;
    /** Plot height in px. Default 120. */
    height?: number;
    className?: string;
    style?: React.CSSProperties;
}
/**
 * Energy-usage panel — a titled {@link Card} wrapping the shared inline-SVG
 * {@link BarChart} (no new chart code). The header shows the period total + unit;
 * the chart renders each sample as a `color`-token bar. When `data` is empty the
 * card shows a muted "No usage data yet" line instead of an axis. `labels` are
 * passed straight through (BarChart aligns them per bar). Token-bound throughout.
 */
export declare const EnergyUsage: React.ForwardRefExoticComponent<EnergyUsageProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EnergyUsage.d.ts.map