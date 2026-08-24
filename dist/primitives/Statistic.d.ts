import * as React from 'react';
export type StatisticTrend = 'up' | 'down' | 'flat';
export interface StatisticProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Small caption above the value. */
    label: React.ReactNode;
    /** The headline number/string. */
    value: React.ReactNode;
    /** Optional change indicator shown beside the value. */
    delta?: string | number;
    /**
     * Tone/arrow for `delta`. Omit to infer from a numeric `delta`
     * (positive → up/success, negative → down/danger, 0 → flat/muted).
     */
    trend?: StatisticTrend;
    /** Optional unit/suffix rendered muted after the value (e.g. `%`, `MB`). */
    suffix?: React.ReactNode;
}
/**
 * Web parity of the native `Statistic`: a compact inline metric — caption label,
 * a large value, and an optional up/down/flat delta. Renders bare (not a card) so
 * it can sit in rows, headers, or grids. All colors/sizes come from the `--xen-*`
 * tokens via Tailwind classes — no literal colors.
 */
export declare const Statistic: React.ForwardRefExoticComponent<StatisticProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Statistic.d.ts.map