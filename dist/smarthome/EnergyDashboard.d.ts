import * as React from 'react';
/** Tone key for a breakdown slice — resolved to a token opacity of the near-white ink. */
export type EnergyBreakdownTone = 'primary' | 'accent' | 'warn' | 'success';
export interface EnergyDashboardProps extends React.HTMLAttributes<HTMLDivElement> {
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
}
/**
 * EnergyDashboard — a whole-home energy **hero** for the smart-home module (web
 * parity of the native twin). A brand-gradient ground carries the big near-white
 * usage numeral, a cost + period line, a delta chip (for energy, up = worse, so
 * a rise reads as a warning arrow), an optional solar line, and an optional
 * stacked usage bar with a frosted legend. The bar is one gradient-safe run of
 * the near-white ink at token opacities — every color derives from the brand
 * ramp (gradient `from-primary-500 to-primary-700`, ink `text-primary-50/100`,
 * frosted tiles `bg-primary-50/15` + `border-primary-50/30`) — token-only, no
 * literals, light + dark. Presentational: shaped data, nothing fetches.
 */
export declare const EnergyDashboard: React.ForwardRefExoticComponent<EnergyDashboardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EnergyDashboard.d.ts.map