import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Tone key for a breakdown slice — resolved to a token opacity of the near-white ink. */
export type EnergyBreakdownTone = 'primary' | 'accent' | 'warn' | 'success';
export interface EnergyDashboardProps {
    /** Headline usage figure, already formatted (e.g. "24.6 kWh") — the near-white numeral. */
    usageLabel: string;
    /** Optional cost line for the period (e.g. "$4.20 today"). */
    costLabel?: string;
    /** Period the figures cover. Default `'Today'`. */
    period?: string;
    /**
     * Optional change vs the previous period, as a percentage. For energy, **up
     * means worse** (more used); the delta chip reflects that in tone + arrow.
     */
    deltaPct?: number;
    /** Optional solar generation line, already formatted (e.g. "6.1 kWh solar"). */
    solarLabel?: string;
    /**
     * Optional usage breakdown, rendered as a stacked token bar with a frosted
     * legend. `value` is a raw magnitude; slices are normalised to the total.
     */
    breakdown?: readonly {
        label: string;
        value: number;
        tone?: EnergyBreakdownTone;
    }[];
    style?: StyleProp<ViewStyle>;
}
/**
 * EnergyDashboard — a whole-home energy **hero** for the smart-home module. A
 * brand-gradient ground carries the big near-white usage numeral, a cost +
 * period line, a delta chip (for energy, up = worse, so a rise reads as a
 * warning arrow), an optional solar line, and an optional stacked usage bar with
 * a frosted legend. The bar is one gradient-safe run of the near-white ink at
 * token opacities — every color derives from the compiled brand ramp via
 * `ambient*` + `withAlpha` + `GradientSurface` — token-only, no literals, light +
 * dark. Presentational: shaped data, nothing fetches.
 */
export declare function EnergyDashboard({ usageLabel, costLabel, period, deltaPct, solarLabel, breakdown, style, }: EnergyDashboardProps): React.ReactElement;
//# sourceMappingURL=EnergyDashboard.d.ts.map