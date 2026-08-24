import * as React from 'react';
import { type ChartColor } from '../charts';
export interface ForecastPeriod {
    /** Axis label (e.g. "Jan", "Q1"). */
    label: string;
    /** Forecast amount for the period in integer **cents**. */
    valueCents: number;
}
export interface DealForecastProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Per-period forecast series. */
    periods: ForecastPeriod[];
    /** Heading (default "Forecast"). */
    title?: string;
    /** ISO 4217 currency (default USD). */
    currency?: string;
    /** Optional target/quota in cents — shown as a labelled reference. */
    targetCents?: number;
    /** Bar color token (default `primary`; use `success` for won-weighted). */
    color?: ChartColor;
    /** Plot height in px (default 128). */
    height?: number;
    /** Placeholder when there are no periods. */
    emptyLabel?: string;
}
/**
 * Revenue forecast block — a header with the summed pipeline total (and, when a
 * `targetCents` is given, attainment vs quota) over a reused {@link BarChart} of
 * per-period amounts. Values are integer cents formatted via `formatMoney`; the
 * bar heights are relative so the raw cents map straight to the chart. Renders
 * an empty placeholder for a zero-length series. Bar/text colors are `--xen-*`
 * token classes (`color` is a `ChartColor` token key) — no literals.
 */
export declare const DealForecast: React.ForwardRefExoticComponent<DealForecastProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DealForecast.d.ts.map