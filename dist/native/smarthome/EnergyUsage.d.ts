import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type SemanticColors } from '../theme';
export interface EnergyUsageProps {
    /** Per-period usage samples (e.g. kWh per day). */
    data: number[];
    /** Labels under each bar (e.g. weekday initials). Indexed defensively. */
    labels?: string[];
    /** Card title. Default "Energy usage". */
    title?: string;
    /** Total for the period (pre-formatted or numeric). */
    total?: string | number;
    /** Unit suffix for the total (e.g. "kWh"). */
    unit?: string;
    /** Bar color slot. Default `'primary'`. */
    color?: keyof SemanticColors;
    /** Plot height in px. Default 120. */
    height?: number;
    style?: StyleProp<ViewStyle>;
}
/**
 * Energy-usage panel — a titled {@link Card} wrapping the shared View-based
 * {@link BarChart} (no new chart code). The header shows the period total + unit;
 * the chart renders each sample as a `color`-slot bar. When `data` is empty the
 * card shows a muted "No usage data yet" line instead of an axis. `labels` are
 * passed straight through (BarChart aligns them per bar). Token-bound throughout.
 */
export declare function EnergyUsage({ data, labels, title, total, unit, color, height, style, }: EnergyUsageProps): React.ReactElement;
//# sourceMappingURL=EnergyUsage.d.ts.map